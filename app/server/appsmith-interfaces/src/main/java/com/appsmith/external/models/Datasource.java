package com.appsmith.external.models;

import com.appsmith.external.views.FromRequest;
import com.appsmith.external.views.Git;
import com.appsmith.external.views.Views;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.FieldNameConstants;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document
@FieldNameConstants
public class Datasource extends BranchAwareDomain {

    public Datasource(String id, Set<Policy> policies) {
        this.setId(id);
        this.setPolicies(policies);
    }

    @Transient
    public static final String DEFAULT_NAME_PREFIX = "Untitled datasource";

    @JsonView({Views.Public.class, FromRequest.class, Git.class})
    String name;

    @JsonView({Views.Public.class, FromRequest.class, Git.class})
    String pluginId;

    // name of the plugin. used to log analytics events where pluginName is a required attribute
    // It'll be null if not set
    @Transient
    @JsonView({Views.Public.class, FromRequest.class})
    String pluginName;

    // Organizations migrated to workspaces, kept the field as deprecated to support the old migration
    @Deprecated
    @JsonView({Views.Public.class, FromRequest.class})
    String organizationId;

    @JsonView({Views.Public.class, FromRequest.class})
    String workspaceId;

    @JsonView({Views.Public.class, FromRequest.class})
    String templateName;

    // This is only kept public for embedded datasource
    @JsonView({Views.Public.class, FromRequest.class})
    DatasourceConfiguration datasourceConfiguration;

    @Transient
    @JsonView(Views.Public.class)
    Map<String, DatasourceStorageDTO> datasourceStorages = new HashMap<>();

    @JsonView(Views.Public.class)
    Set<String> invalids;

    /*
     * - To return useful hints to the user.
     * - These messages are generated by the API server based on the other datasource attributes.
     */
    @Transient
    @JsonView(Views.Public.class)
    Set<String> messages = new HashSet<>();

    /*
     * This field is used to determine if the Datasource has been generated by the client or auto-generated by the system.
     * We use this field because when embedded datasources are null, spring-data auditable interfaces throw exceptions
     * while trying set createdAt and updatedAt properties on the null object
     */
    @Transient
    @JsonView({Views.Internal.class, Git.class})
    Boolean isAutoGenerated = false;

    /*
     * This field is introduced as part of git sync feature, for the git import we will need to identify the datasource's
     * which are not configured. This way user can configure those datasource, which may have been introduced as part of git import.
     */
    @JsonView(Views.Internal.class)
    Boolean isConfigured;

    @Transient
    @JsonView({Views.Public.class, FromRequest.class})
    Boolean isRecentlyCreated;

    /*
     * This field is meant to indicate whether the datasource is part of a template, or a copy of the same.
     * The field is not used anywhere in the codebase because templates are created directly in the DB, and the field
     * serves only as a DTO property.
     */
    @JsonView({Views.Public.class, FromRequest.class})
    Boolean isTemplate;

    /*
     * This field is meant to indicate whether the datasource is part of a mock DB, or a copy of the same.
     * The field is set during the creation of the mock db
     */
    @JsonView({Views.Public.class, FromRequest.class})
    Boolean isMock;

    @JsonView(Views.Internal.class)
    Boolean hasDatasourceStorage;

    /**
     *
     * This method is here so that the JSON version of this class' instances have a `isValid` field, for backwards
     * compatibility. It may be removed, when sure that no API received is relying on this field.
     *
     * @return boolean, indicating whether this datasource is valid or not.
     */
    @JsonView(Views.Public.class)
    public boolean getIsValid() {
        return CollectionUtils.isEmpty(invalids);
    }

    /**
     * Intended to function like `.equals`, but only semantically significant fields, except for the ID. Semantically
     * significant just means that if two datasource have same values for these fields, actions against them will behave
     * exactly the same.
     *
     * @return true if equal, false otherwise.
     */
    public boolean softEquals(Datasource other) {
        if (other == null) {
            return false;
        }

        return new EqualsBuilder()
                .append(name, other.name)
                .append(pluginId, other.pluginId)
                .append(isAutoGenerated, other.isAutoGenerated)
                .isEquals();
    }

    /**
     * This method sets datasourceConfiguration, messages and isConfigured to null to avoid polluting db.
     * These fields are also maintained in datasource storage in a separate collection, which is being currently used.
     * Since these fields have some use cases which is not yet deprecated, hence these can't be set to transient
     */
    public void nullifyStorageReplicaFields() {
        this.setDatasourceConfiguration(null);
        this.setIsConfigured(null);
        this.setMessages(null);
    }

    public static class Fields extends BranchAwareDomain.Fields {}
}
