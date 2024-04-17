package com.appsmith.server.configurations;

import com.appsmith.util.JSONPrettyPrinter;
import com.appsmith.util.SerializationUtils;
import com.fasterxml.jackson.core.PrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.maven.artifact.versioning.ComparableVersion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Configuration
public class CommonConfig {

    private static final String ELASTIC_THREAD_POOL_NAME = "appsmith-elastic-pool";
    public static final Integer LATEST_INSTANCE_SCHEMA_VERSION = 2;

    @Setter(AccessLevel.NONE)
    private boolean isSignupDisabled = false;

    @Setter(AccessLevel.NONE)
    private Set<String> adminEmails = Collections.emptySet();

    @Value("${oauth2.allowed-domains}")
    private String allowedDomainsForOauthString;

    private List<String> allowedDomainsForOauth;

    @Value("${signup.allowed-domains}")
    private String allowedDomainsString;

    // Is this instance hosted on Appsmith cloud?
    // isCloudHosting should be true only for our cloud instance
    @Value("${is.cloud-hosting:false}")
    private boolean isCloudHosting;

    @Value("${github_repo}")
    private String repo;

    @Value("${appsmith.admin.envfile:}")
    public String envFilePath;

    @Value("${disable.telemetry:true}")
    private boolean isTelemetryDisabled;

    @Value("${appsmith.rts.port:8091}")
    private String rtsPort;

    @Value("${appsmith.micrometer.tracing.detail.enabled:false}")
    private boolean tracingDetail;

    private List<String> allowedDomains;

    private String mongoDBVersion;

    private static final String MIN_SUPPORTED_MONGODB_VERSION = "5.0.0";

    @Bean
    public Scheduler scheduler() {
        return Schedulers.newBoundedElastic(
                Schedulers.DEFAULT_BOUNDED_ELASTIC_SIZE,
                Schedulers.DEFAULT_BOUNDED_ELASTIC_QUEUESIZE,
                ELASTIC_THREAD_POOL_NAME);
    }

    @Bean
    public Validator validator() {
        try (ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory()) {
            return validatorFactory.getValidator();
        }
    }

    @Bean
    public PrettyPrinter prettyPrinter() {
        return new JSONPrettyPrinter();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return SerializationUtils.getDefaultObjectMapper(null);
    }

    @Bean
    public Gson gsonInstance() {
        GsonBuilder gsonBuilder = new GsonBuilder();
        SerializationUtils.typeAdapterRegistration().customize(gsonBuilder);
        return gsonBuilder.create();
    }

    public List<String> getOauthAllowedDomains() {
        if (allowedDomainsForOauth == null) {
            final Set<String> domains = new HashSet<>();
            if (StringUtils.hasText(allowedDomainsForOauthString)) {
                domains.addAll(Arrays.asList(allowedDomainsForOauthString.trim().split("\\s*,[,\\s]*")));
            }
            domains.addAll(getAllowedDomains());
            allowedDomainsForOauth = new ArrayList<>(domains);
        }

        return allowedDomainsForOauth;
    }

    public List<String> getAllowedDomains() {
        if (allowedDomains == null) {
            allowedDomains = StringUtils.hasText(allowedDomainsString)
                    ? Arrays.asList(allowedDomainsString.trim().split("\\s*,[,\\s]*"))
                    : Collections.emptyList();
        }

        return allowedDomains;
    }

    @Autowired
    public void setAdminEmails(@Value("${admin.emails}") String value) {
        adminEmails = Set.of(value.trim().split("\\s*,\\s*"));
    }

    @Autowired
    public void setSignupDisabled(@Value("${signup.disabled}") String value) {
        // If `true`, then disable signup. If anything else, including empty string, then signups will be enabled.
        isSignupDisabled = "true".equalsIgnoreCase(value);
    }

    public String getRtsBaseUrl() {
        return "http://127.0.0.1:" + rtsPort;
    }

    public boolean isMongoUptoDate() {
        ComparableVersion minSupportedVersion = new ComparableVersion(MIN_SUPPORTED_MONGODB_VERSION);
        ComparableVersion connectedMongoVersion = new ComparableVersion(mongoDBVersion);
        return minSupportedVersion.compareTo(connectedMongoVersion) <= 0;
    }

    public boolean isConnectedMongoVersionAvailable() {
        return mongoDBVersion != null;
    }

    public Long getCurrentTimeInstantEpochMilli() {
        return Instant.now().toEpochMilli();
    }
}
