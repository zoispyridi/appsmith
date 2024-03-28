package com.appsmith.server.services.ce;

import com.appsmith.external.constants.AnalyticsEvents;
import com.appsmith.external.helpers.Identifiable;
import com.appsmith.external.models.ActionDTO;
import com.appsmith.external.models.BaseDomain;
import com.appsmith.server.configurations.CommonConfig;
import com.appsmith.server.configurations.ProjectProperties;
import com.appsmith.server.constants.FieldName;
import com.appsmith.server.domains.NewPage;
import com.appsmith.server.domains.User;
import com.appsmith.server.helpers.ExchangeUtils;
import com.appsmith.server.helpers.UserUtils;
import com.appsmith.server.repositories.UserDataRepository;
import com.appsmith.server.services.ConfigService;
import com.appsmith.server.services.SessionUserService;
import com.segment.analytics.Analytics;
import com.segment.analytics.messages.IdentifyMessage;
import com.segment.analytics.messages.TrackMessage;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.appsmith.server.constants.AnalyticsConstants.EMAIL_DOMAIN_HASH;
import static com.appsmith.server.constants.AnalyticsConstants.IS_SUPER_USER;
import static com.appsmith.server.constants.FieldName.EMAIL;
import static com.appsmith.server.constants.FieldName.INSTANCE_ID;
import static com.appsmith.server.constants.FieldName.NAME;

@Slf4j
public class AnalyticsServiceCEImpl implements AnalyticsServiceCE {

    private final Analytics analytics;
    private final SessionUserService sessionUserService;
    private final CommonConfig commonConfig;
    private final ConfigService configService;

    private final UserUtils userUtils;

    private final ProjectProperties projectProperties;

    private final UserDataRepository userDataRepository;

    @Autowired
    public AnalyticsServiceCEImpl(
            @Autowired(required = false) Analytics analytics,
            SessionUserService sessionUserService,
            CommonConfig commonConfig,
            ConfigService configService,
            UserUtils userUtils,
            ProjectProperties projectProperties,
            UserDataRepository userDataRepository) {
        this.analytics = analytics;
        this.sessionUserService = sessionUserService;
        this.commonConfig = commonConfig;
        this.configService = configService;
        this.userUtils = userUtils;
        this.projectProperties = projectProperties;
        this.userDataRepository = userDataRepository;
    }

    public boolean isActive() {
        return analytics != null;
    }

    private String hash(String value) {
        return value == null ? "" : DigestUtils.sha256Hex(value);
    }

    private String getEmailDomainHash(String email) {
        if (email == null) {
            return "";
        }

        return hash(email.contains("@") ? email.split("@", 2)[1] : "");
    }

    @Override
    public Mono<User> identifyUser(User user, @NonNull Map<String, ?> traits) {
        if (!isActive()) {
            return Mono.just(user);
        }

        Mono<Boolean> isSuperUserMono = userUtils.isSuperUser(user);

        return Mono.zip(
                        Mono.just(user),
                        isSuperUserMono,
                        configService.getInstanceId().defaultIfEmpty("unknown-instance-id"))
                .map(tuple -> {
                    final User savedUser = tuple.getT1();
                    final boolean isSuperUser = tuple.getT2();
                    final String instanceId = tuple.getT3();

                    String username = savedUser.getUsername();
                    String name = savedUser.getName();
                    String email = savedUser.getEmail();
                    final String emailDomainHash = getEmailDomainHash(email);

                    if (!commonConfig.isCloudHosting()) {
                        username = hash(username);
                        name = hash(name);
                        email = hash(email);
                    }

                    // Create a new map to avoid modifying the original map which may result in updating the immutable
                    // collection error based on the argument passed
                    Map<String, Object> props = new HashMap<>(traits);
                    props.put(NAME, name);
                    props.put(EMAIL, email);
                    props.put(EMAIL_DOMAIN_HASH, emailDomainHash);
                    props.put(IS_SUPER_USER, isSuperUser);
                    props.put(INSTANCE_ID, instanceId);
                    analytics.enqueue(IdentifyMessage.builder()
                            .userId(ObjectUtils.defaultIfNull(username, ""))
                            .traits(props));
                    analytics.flush();
                    return savedUser;
                });
    }

    public void identifyInstance(String instanceId, Map<String, Object> instanceTraits) {
        if (!isActive()) {
            return;
        }
        Map<String, Object> traits = new HashMap<>(instanceTraits);
        traits.put("isInstance", true);
        analytics.enqueue(IdentifyMessage.builder().userId(instanceId).traits(traits));
        analytics.flush();
    }

    @Override
    public Mono<Void> sendEvent(String event, String userId, Map<String, ?> properties) {
        return sendEvent(event, userId, properties, true);
    }

    @Override
    public Mono<Void> sendEvent(String event, String userId, Map<String, ?> properties, boolean hashUserId) {
        if (!isActive()) {
            return Mono.empty();
        }

        // Can't update the properties directly as it's throwing ImmutableCollection error
        // java.lang.UnsupportedOperationException: null
        // at java.base/java.util.ImmutableCollections.uoe(ImmutableCollections.java)
        // at java.base/java.util.ImmutableCollections$AbstractImmutableMap.put(ImmutableCollections.java)
        Map<String, Object> analyticsProperties = properties == null ? new HashMap<>() : new HashMap<>(properties);

        final String immutableUserId = userId;
        final String emailDomainHash = getEmailDomainHash(immutableUserId);

        // Hash usernames at all places for self-hosted instance
        if (shouldHashUserId(event, userId, hashUserId, commonConfig.isCloudHosting())) {
            final String hashedUserId = hash(userId);
            analyticsProperties.remove("request");
            for (final Map.Entry<String, Object> entry : analyticsProperties.entrySet()) {
                if (userId.equals(entry.getValue())) {
                    analyticsProperties.put(entry.getKey(), hashedUserId);
                }
            }
            userId = hashedUserId;
        }

        // Segment throws an NPE if any value in `properties` is null.
        for (final Map.Entry<String, Object> entry : analyticsProperties.entrySet()) {
            if (entry.getValue() == null) {
                analyticsProperties.put(entry.getKey(), "");
            }
        }

        // Remove extra event data property if it's present
        if (analyticsProperties.containsKey(FieldName.EVENT_DATA)) {
            analyticsProperties.remove(FieldName.EVENT_DATA);
        }

        final String finalUserId = userId;

        return Mono.zip(
                        ExchangeUtils.getAnonymousUserIdFromCurrentRequest(),
                        ExchangeUtils.getUserAgentFromCurrentRequest(),
                        configService.getInstanceId().defaultIfEmpty("unknown-instance-id"))
                .map(tuple -> {
                    final String userIdFromClient = tuple.getT1();
                    final String userAgent = tuple.getT2();
                    final String instanceId = tuple.getT3();
                    String userIdToSend = finalUserId;
                    if (FieldName.ANONYMOUS_USER.equals(finalUserId)) {
                        userIdToSend = StringUtils.defaultIfEmpty(userIdFromClient, FieldName.ANONYMOUS_USER);
                    }
                    TrackMessage.Builder messageBuilder =
                            TrackMessage.builder(event).userId(userIdToSend).context(Map.of("userAgent", userAgent));
                    // For Installation Setup Complete event we are using `instanceId` as tracking id
                    // As this does not satisfy the email validation it's not getting hashed correctly
                    if (AnalyticsEvents.INSTALLATION_SETUP_COMPLETE
                                    .getEventName()
                                    .equals(event)
                            && analyticsProperties.containsKey(EMAIL)) {

                        String email = analyticsProperties.get(EMAIL) != null
                                ? analyticsProperties.get(EMAIL).toString()
                                : "";
                        analyticsProperties.put(EMAIL_DOMAIN_HASH, getEmailDomainHash(email));
                    } else {
                        analyticsProperties.put(EMAIL_DOMAIN_HASH, emailDomainHash);
                    }
                    analyticsProperties.put("originService", "appsmith-server");
                    analyticsProperties.put("instanceId", instanceId);
                    analyticsProperties.put("version", projectProperties.getVersion());
                    messageBuilder = messageBuilder.properties(analyticsProperties);
                    analytics.enqueue(messageBuilder);
                    return instanceId;
                })
                .then();
    }

    @Override
    public <T extends BaseDomain> Mono<T> sendObjectEvent(AnalyticsEvents event, T object) {
        return sendObjectEvent(event, object, null);
    }

    public <T> Mono<T> sendObjectEvent(AnalyticsEvents event, T object, Map<String, Object> extraProperties) {
        if (!isActive() || !(object instanceof Identifiable)) {
            return Mono.just(object);
        }

        // Get the event name tag based on the event and object
        // Event tag is of the form `eventName_objectClassName` or just `eventName` if the event is not associated with
        // any object.
        // Example of form eventName_objectClassName: `create_user`, `update_page`, `delete_action`
        // Example of form eventName: `execute_ACTION_TRIGGERED`, `Authentication Method Configured`
        // For more info on this, refer to the `getEventTag` method and `getNonResourceEvents` method
        final String eventTag = getEventTag(event, object);

        // We will create an anonymous user object for event tracking if no user is present
        // Without this, a lot of flows meant for anonymous users will error out

        // In case the event needs to be sent during sign in, then `sessionUserService.getCurrentUser()` returns
        // Mono.empty()
        // Handle the same by returning an anonymous user only for sending events.
        User anonymousUser = new User();
        anonymousUser.setName(FieldName.ANONYMOUS_USER);
        anonymousUser.setEmail(FieldName.ANONYMOUS_USER);
        anonymousUser.setIsAnonymous(true);

        Mono<User> userMono = sessionUserService.getCurrentUser().switchIfEmpty(Mono.just(anonymousUser));

        return userMono.flatMap(user -> Mono.zip(
                        user.isAnonymous()
                                ? ExchangeUtils.getAnonymousUserIdFromCurrentRequest()
                                : Mono.just(user.getUsername()),
                        Mono.just(user)))
                .flatMap(tuple -> {
                    final String id = tuple.getT1();
                    final User user = tuple.getT2();

                    // In case the user is anonymous, don't raise an event, unless it's a signup, logout, page view or
                    // action execution event.
                    boolean isEventUserSignUpOrLogout = object instanceof User
                            && (event == AnalyticsEvents.CREATE || event == AnalyticsEvents.LOGOUT);
                    boolean isEventPageView = object instanceof NewPage && event == AnalyticsEvents.VIEW;
                    boolean isEventActionExecution =
                            object instanceof ActionDTO && event == AnalyticsEvents.EXECUTE_ACTION;
                    boolean isAvoidLoggingEvent = user.isAnonymous()
                            && !(isEventUserSignUpOrLogout || isEventPageView || isEventActionExecution);
                    if (isAvoidLoggingEvent) {
                        return Mono.just(object);
                    }

                    final String username = (object instanceof User objectAsUser ? objectAsUser : user).getUsername();

                    HashMap<String, Object> analyticsProperties = new HashMap<>();
                    analyticsProperties.put("id", id);
                    analyticsProperties.put("oid", ((Identifiable) object).getId());
                    if (extraProperties != null) {
                        analyticsProperties.putAll(extraProperties);
                        // To avoid sending extra event data to analytics
                        analyticsProperties.remove(FieldName.EVENT_DATA);
                    }
                    if (analyticsProperties.containsKey(FieldName.CLOUD_HOSTED_EXTRA_PROPS)) {
                        if (commonConfig.isCloudHosting()) {
                            Map<String, Object> extraPropsForCloudHostedInstance =
                                    (Map<String, Object>) analyticsProperties.get(FieldName.CLOUD_HOSTED_EXTRA_PROPS);
                            analyticsProperties.putAll(extraPropsForCloudHostedInstance);
                        }
                        analyticsProperties.remove(FieldName.CLOUD_HOSTED_EXTRA_PROPS);
                    }

                    return sendEvent(eventTag, username, analyticsProperties).thenReturn(object);
                });
    }

    /**
     * Generates event name tag to analytic events
     *
     * @param event  AnalyticsEvents
     * @param object Analytic event resource object
     * @return String
     */
    private <T> String getEventTag(AnalyticsEvents event, T object) {
        // In case of action execution or instance setting update, event.getEventName() only is used to support backward
        // compatibility of event name
        List<AnalyticsEvents> nonResourceEvents = getNonResourceEvents();
        boolean isNonResourceEvent = nonResourceEvents.contains(event);
        final String eventTag = isNonResourceEvent
                ? event.getEventName()
                : event.getEventName() + "_" + object.getClass().getSimpleName().toUpperCase();

        return eventTag;
    }

    /**
     * To get non resource events list
     *
     * @return List of AnanlyticsEvents
     */
    public List<AnalyticsEvents> getNonResourceEvents() {
        return List.of(
                AnalyticsEvents.EXECUTE_ACTION,
                AnalyticsEvents.AUTHENTICATION_METHOD_CONFIGURATION,
                AnalyticsEvents.EXECUTE_INVITE_USERS,
                AnalyticsEvents.UPDATE_LAYOUT,
                AnalyticsEvents.DS_TEST_EVENT,
                AnalyticsEvents.DS_TEST_EVENT_SUCCESS,
                AnalyticsEvents.DS_TEST_EVENT_FAILED,
                AnalyticsEvents.DS_SCHEMA_FETCH_EVENT);
    }

    /**
     * Tells whether to hash userId or not for events
     *
     * @param event String
     * @param userId String
     * @param hashUserId Boolean
     * @param isCloudHosting Boolean
     * @return Boolean
     */
    public static Boolean shouldHashUserId(String event, String userId, boolean hashUserId, boolean isCloudHosting) {
        // In case of anonymous users and self hosted instance, we do not need to hash userId
        // If we hash userId in such case, mixpanel will club all of such events as one unique instance
        return userId != null
                && hashUserId
                && !userId.equals(FieldName.ANONYMOUS_USER)
                && !isCloudHosting
                // But send the email intact for the subscribe event, which is sent only if the user has explicitly
                // agreed to it.
                && !AnalyticsEvents.SUBSCRIBE_MARKETING_EMAILS.name().equals(event);
    }

    public <T extends BaseDomain> Mono<T> sendCreateEvent(T object, Map<String, Object> extraProperties) {
        return sendObjectEvent(AnalyticsEvents.CREATE, object, extraProperties);
    }

    public <T extends BaseDomain> Mono<T> sendCreateEvent(T object) {
        return sendCreateEvent(object, null);
    }

    public <T extends BaseDomain> Mono<T> sendUpdateEvent(T object, Map<String, Object> extraProperties) {
        return sendObjectEvent(AnalyticsEvents.UPDATE, object, extraProperties);
    }

    public <T extends BaseDomain> Mono<T> sendUpdateEvent(T object) {
        return sendUpdateEvent(object, null);
    }

    public <T extends BaseDomain> Mono<T> sendDeleteEvent(T object, Map<String, Object> extraProperties) {
        return sendObjectEvent(AnalyticsEvents.DELETE, object, extraProperties);
    }

    public <T extends BaseDomain> Mono<T> sendArchiveEvent(T object, Map<String, Object> extraProperties) {
        return sendObjectEvent(AnalyticsEvents.ARCHIVE, object, extraProperties);
    }

    public <T extends BaseDomain> Mono<T> sendDeleteEvent(T object) {
        return sendDeleteEvent(object, null);
    }

    public String convertWithStream(Map<String, ?> map) {
        String mapAsString =
                map.keySet().stream().map(key -> key + "=" + map.get(key)).collect(Collectors.joining(", ", "{", "}"));
        return mapAsString;
    }
}
