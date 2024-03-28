package com.appsmith.server.services.ce;

import com.appsmith.external.constants.AnalyticsEvents;
import com.appsmith.external.models.BaseDomain;
import com.appsmith.server.domains.User;
import lombok.NonNull;
import reactor.core.publisher.Mono;

import java.util.Map;

public interface AnalyticsServiceCE {

    boolean isActive();

    Mono<User> identifyUser(User user, @NonNull Map<String, ?> traits);

    void identifyInstance(String instanceId, Map<String, Object> instanceTraits);

    Mono<Void> sendEvent(String event, String userId, Map<String, ?> properties);

    Mono<Void> sendEvent(String event, String userId, Map<String, ?> properties, boolean hashUserId);

    <T> Mono<T> sendObjectEvent(AnalyticsEvents event, T object, Map<String, Object> extraProperties);

    <T extends BaseDomain> Mono<T> sendObjectEvent(AnalyticsEvents event, T object);

    <T extends BaseDomain> Mono<T> sendCreateEvent(T object, Map<String, Object> extraProperties);

    <T extends BaseDomain> Mono<T> sendCreateEvent(T object);

    <T extends BaseDomain> Mono<T> sendUpdateEvent(T object, Map<String, Object> extraProperties);

    <T extends BaseDomain> Mono<T> sendUpdateEvent(T object);

    <T extends BaseDomain> Mono<T> sendDeleteEvent(T object, Map<String, Object> extraProperties);

    <T extends BaseDomain> Mono<T> sendArchiveEvent(T object, Map<String, Object> extraProperties);

    <T extends BaseDomain> Mono<T> sendDeleteEvent(T object);
}
