package com.appsmith.server.services;

import com.appsmith.external.git.GitExecutor;
import com.appsmith.git.service.GitExecutorImpl;
import com.appsmith.server.actioncollections.base.ActionCollectionService;
import com.appsmith.server.actions.base.ActionService;
import com.appsmith.server.applications.base.ApplicationService;
import com.appsmith.server.configurations.EmailConfig;
import com.appsmith.server.datasources.base.DatasourceService;
import com.appsmith.server.exports.internal.ExportService;
import com.appsmith.server.helpers.GitFileUtils;
import com.appsmith.server.helpers.GitPrivateRepoHelper;
import com.appsmith.server.helpers.RedisUtils;
import com.appsmith.server.helpers.ResponseUtils;
import com.appsmith.server.helpers.ce.GitAutoCommitHelper;
import com.appsmith.server.imports.internal.ImportService;
import com.appsmith.server.newpages.base.NewPageService;
import com.appsmith.server.plugins.base.PluginService;
import com.appsmith.server.repositories.GitDeployKeysRepository;
import com.appsmith.server.services.ce_compatible.GitServiceCECompatibleImpl;
import com.appsmith.server.solutions.ApplicationPermission;
import com.appsmith.server.solutions.DatasourcePermission;
import com.appsmith.server.solutions.WorkspacePermission;
import io.micrometer.observation.ObservationRegistry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Service;
import org.springframework.transaction.reactive.TransactionalOperator;

@Slf4j
@Service
@Import({GitExecutorImpl.class})
public class GitServiceImpl extends GitServiceCECompatibleImpl implements GitService {
    public GitServiceImpl(
            UserService userService,
            UserDataService userDataService,
            SessionUserService sessionUserService,
            ApplicationService applicationService,
            ApplicationPageService applicationPageService,
            NewPageService newPageService,
            ActionService actionService,
            ActionCollectionService actionCollectionService,
            GitFileUtils fileUtils,
            ImportService importService,
            ExportService exportService,
            GitExecutor gitExecutor,
            ResponseUtils responseUtils,
            EmailConfig emailConfig,
            AnalyticsService analyticsService,
            GitDeployKeysRepository gitDeployKeysRepository,
            DatasourceService datasourceService,
            PluginService pluginService,
            DatasourcePermission datasourcePermission,
            ApplicationPermission applicationPermission,
            WorkspacePermission workspacePermission,
            WorkspaceService workspaceService,
            RedisUtils redisUtils,
            ObservationRegistry observationRegistry,
            GitPrivateRepoHelper gitPrivateRepoHelper,
            TransactionalOperator transactionalOperator,
            GitAutoCommitHelper gitAutoCommitHelper) {
        super(
                userService,
                userDataService,
                sessionUserService,
                applicationService,
                applicationPageService,
                newPageService,
                actionService,
                actionCollectionService,
                fileUtils,
                importService,
                exportService,
                gitExecutor,
                responseUtils,
                emailConfig,
                analyticsService,
                gitDeployKeysRepository,
                datasourceService,
                pluginService,
                datasourcePermission,
                applicationPermission,
                workspacePermission,
                workspaceService,
                redisUtils,
                observationRegistry,
                gitPrivateRepoHelper,
                transactionalOperator,
                gitAutoCommitHelper);
    }
}
