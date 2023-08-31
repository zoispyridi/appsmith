export type EventLocation =
  | "LIGHTNING_MENU"
  | "API_PANE"
  | "QUERY_PANE"
  | "QUERY_TEMPLATE"
  | "QUICK_COMMANDS"
  | "OMNIBAR"
  | "SUBMENU"
  | "ACTION_SELECTOR"
  | "ENTITY_EXPLORER"
  | "KEYBOARD_SHORTCUT"
  | "JS_OBJECT_GUTTER_RUN_BUTTON" // Gutter: https://codemirror.net/examples/gutter/
  | "JS_OBJECT_MAIN_RUN_BUTTON"
  | "JS_OBJECT_RESPONSE_RUN_BUTTON"
  | "ONE_CLICK_BINDING";

export type EventName =
  | "APP_CRASH"
  | "SWITCH_DATASOURCE"
  | "LOGIN_CLICK"
  | "SIGNUP_CLICK"
  | "SIGNUP_REACHED"
  | "PAGE_VIEW"
  | "ADD_COMPONENT"
  | "DELETE_COMPONENT"
  | "RESIZE_COMPONENT"
  | "WIDGET_DRAG"
  | "WIDGET_DROP"
  | "WIDGET_DELETE"
  | "WIDGET_RESIZE_START"
  | "WIDGET_RESIZE_END"
  | "WIDGET_PROPERTY_UPDATE"
  | "WIDGET_TOGGLE_JS_PROP"
  | "WIDGET_CARD_DRAG"
  | "WIDGET_CARD_DROP"
  | "CREATE_PAGE"
  | "PAGE_RENAME"
  | "PAGE_SWITCH"
  | "DELETE_PAGE"
  | "SIDEBAR_NAVIGATION"
  | "PUBLISH_APP"
  | "PREVIEW_APP"
  | "APP_VIEWED_WITH_NAVBAR"
  | "EDITOR_OPEN"
  | "CREATE_ACTION"
  | "DELETE_SAAS"
  | "RUN_SAAS_API"
  | "SAVE_API_CLICK"
  | "RUN_API"
  | "RUN_API_CLICK"
  | "RUN_API_SHORTCUT"
  | "DELETE_API"
  | "DELETE_API_CLICK"
  | "IMPORT_API"
  | "EXPAND_API"
  | "IMPORT_API_CLICK"
  | "MOVE_API_CLICK"
  | "ADD_API_PAGE"
  | "DUPLICATE_ACTION"
  | "DUPLICATE_ACTION_CLICK"
  | "RUN_QUERY"
  | "RUN_QUERY_CLICK"
  | "RUN_QUERY_SHORTCUT"
  | "DELETE_QUERY"
  | "MOVE_API"
  | "3P_PROVIDER_CLICK"
  | "API_SELECT"
  | "CREATE_API_CLICK"
  | "AUTO_COMPLETE_SHOW"
  | "AUTO_COMPLETE_SELECT"
  | "CREATE_APP_CLICK"
  | "CREATE_APP"
  | "CREATE_DATA_SOURCE_CLICK"
  | "SAVE_DATA_SOURCE"
  | "SAVE_DATA_SOURCE_CLICK"
  | "CONSOLE_LOG_CREATED"
  | "TEST_DATA_SOURCE_SUCCESS"
  | "TEST_DATA_SOURCE_CLICK"
  | "UPDATE_DATASOURCE"
  | "CREATE_QUERY_CLICK"
  | "NAVIGATE"
  | "PAGE_LOAD"
  | "NAVIGATE_EDITOR"
  | "PROPERTY_PANE_OPEN"
  | "PROPERTY_PANE_CLOSE"
  | "PROPERTY_PANE_OPEN_CLICK"
  | "WIDGET_DELETE_UNDO"
  | "WIDGET_COPY_VIA_SHORTCUT"
  | "WIDGET_COPY"
  | "WIDGET_CUT_VIA_SHORTCUT"
  | "WIDGET_PASTE"
  | "WIDGET_DELETE_VIA_SHORTCUT"
  | "OPEN_HELP"
  | "INVITE_USER"
  | "ROUTE_CHANGE"
  | "PROPERTY_PANE_CLOSE_CLICK"
  | "APPLICATIONS_PAGE_LOAD"
  | "EXECUTE_ACTION"
  | "FILE_UPLOAD_COMPLETE"
  | "WELCOME_TOUR_CLICK"
  | "GUIDED_TOUR_RATING"
  | "GUIDED_TOUR_REACHED_STEP"
  | "END_GUIDED_TOUR_CLICK"
  | "OPEN_OMNIBAR"
  | "CLOSE_OMNIBAR"
  | "NAVIGATE_TO_ENTITY_FROM_OMNIBAR"
  | "PAGE_SAVE"
  | "CORRECT_BAD_BINDING"
  | "OPEN_DEBUGGER"
  | "DEBUGGER_TAB_SWITCH"
  | "DEBUGGER_FILTER_CHANGED"
  | "DEBUGGER_ENTITY_NAVIGATION"
  | "GSHEET_AUTH_INIT"
  | "GSHEET_AUTH_COMPLETE"
  | "CYCLICAL_DEPENDENCY_ERROR"
  | "DISCORD_LINK_CLICK"
  | "INTERCOM_CLICK"
  | "ENTITY_BINDING_SUCCESS"
  | "APP_MENU_OPTION_CLICK"
  | "SLASH_COMMAND"
  | "DEBUGGER_NEW_ERROR"
  | "DEBUGGER_RESOLVED_ERROR"
  | "DEBUGGER_NEW_ERROR_MESSAGE"
  | "DEBUGGER_RESOLVED_ERROR_MESSAGE"
  | "DEBUGGER_LOG_ITEM_EXPAND"
  | "DEBUGGER_HELP_CLICK"
  | "DEBUGGER_CONTEXT_MENU_CLICK"
  | "ADD_MOCK_DATASOURCE_CLICK"
  | "GEN_CRUD_PAGE_CREATE_NEW_DATASOURCE"
  | "GEN_CRUD_PAGE_FORM_SUBMIT"
  | "GEN_CRUD_PAGE_EDIT_DATASOURCE_CONFIG"
  | "GEN_CRUD_PAGE_SELECT_DATASOURCE"
  | "GEN_CRUD_PAGE_SELECT_TABLE"
  | "GEN_CRUD_PAGE_SELECT_SEARCH_COLUMN"
  | "BUILD_FROM_SCRATCH_ACTION_CARD_CLICK"
  | "GEN_CRUD_PAGE_ACTION_CARD_CLICK"
  | "GEN_CRUD_PAGE_DATA_SOURCE_CLICK"
  | "DATASOURCE_CARD_GEN_CRUD_PAGE_ACTION"
  | "DATASOURCE_CARD_DELETE_ACTION"
  | "DATASOURCE_CARD_EDIT_ACTION"
  | "UNSUPPORTED_PLUGIN_DIALOG_BACK_ACTION"
  | "UNSUPPORTED_PLUGIN_DIALOG_CONTINUE_ACTION"
  | "SELECT_IN_CANVAS_CLICK"
  | "WIDGET_SELECTED_VIA_SNIPING_MODE"
  | "SUGGESTED_WIDGET_CLICK"
  | "ASSOCIATED_ENTITY_CLICK"
  | "CREATE_DATA_SOURCE_AUTH_API_CLICK"
  | "CONNECT_DATA_CLICK"
  | "RESPONSE_TAB_RUN_ACTION_CLICK"
  | "ASSOCIATED_ENTITY_DROPDOWN_CLICK"
  | "PAGES_LIST_LOAD"
  | "WIDGET_GROUP"
  | "CLOSE_GEN_PAGE_INFO_MODAL"
  | "COMMENTS_TOGGLE_MODE"
  | "COMMENTS_ONBOARDING_SKIP_BUTTON_CLICK"
  | "COMMENTS_ONBOARDING_STEP_CHANGE"
  | "COMMENTS_ONBOARDING_SUBMIT_BUTTON_CLICK"
  | "COMMENTS_ONBOARDING_MODAL_DISMISSED"
  | "COMMENTS_ONBOARDING_MODAL_TRIGGERED"
  | "REPLAY_UNDO"
  | "REPLAY_REDO"
  | "URL_COPIED"
  | "SNIPPET_CUSTOMIZE"
  | "SNIPPET_EXECUTE"
  | "SNIPPET_FILTER"
  | "SNIPPET_COPIED"
  | "SNIPPET_LOOKUP"
  | "SIGNPOSTING_SKIP"
  | "SIGNPOSTING_MODAL_CREATE_DATASOURCE_CLICK"
  | "SIGNPOSTING_MODAL_CREATE_QUERY_CLICK"
  | "SIGNPOSTING_MODAL_ADD_WIDGET_CLICK"
  | "SIGNPOSTING_MODAL_CONNECT_WIDGET_CLICK"
  | "SIGNPOSTING_MODAL_PUBLISH_CLICK"
  | "SIGNPOSTING_WELCOME_TOUR_CLICK"
  | "SIGNPOSTING_MODAL_CLOSE_CLICK"
  | "SIGNPOSTING_INFO_CLICK"
  | "SIGNPOSTING_MODAL_FIRST_TIME_OPEN"
  | "SIGNPOSTING_STEP_COMPLETE"
  | "GS_BRANCH_MORE_MENU_OPEN"
  | "GIT_DISCARD_WARNING"
  | "GIT_DISCARD_CANCEL"
  | "GIT_DISCARD"
  | "GS_OPEN_BRANCH_LIST_POPUP"
  | "GS_CREATE_NEW_BRANCH"
  | "GS_SYNC_BRANCHES"
  | "GS_CONNECT_GIT_CLICK"
  | "GS_SETTING_CLICK"
  | "GS_DISCONNECT_GIT_CLICK"
  | "GS_COMMIT_AND_PUSH_BUTTON_CLICK"
  | "GS_LAST_DEPLOYED_PREVIEW_LINK_CLICK"
  | "GS_PULL_GIT_CLICK"
  | "GS_DEPLOY_GIT_CLICK"
  | "GS_DEPLOY_GIT_MODAL_TRIGGERED"
  | "GS_MERGE_GIT_MODAL_TRIGGERED"
  | "GS_REPO_LIMIT_ERROR_MODAL_TRIGGERED"
  | "GS_GIT_DOCUMENTATION_LINK_CLICK"
  | "GS_MERGE_CHANGES_BUTTON_CLICK"
  | "GS_REPO_URL_EDIT"
  | "GS_MATCHING_REPO_NAME_ON_GIT_DISCONNECT_MODAL"
  | "GS_GENERATE_KEY_BUTTON_CLICK"
  | "GS_COPY_SSH_KEY_BUTTON_CLICK"
  | "GS_DEFAULT_CONFIGURATION_EDIT_BUTTON_CLICK"
  | "GS_DEFAULT_CONFIGURATION_CHECKBOX_TOGGLED"
  | "GS_CONNECT_BUTTON_ON_GIT_SYNC_MODAL_CLICK"
  | "GS_IMPORT_VIA_GIT_CARD_CLICK"
  | "GS_CONTACT_SALES_CLICK"
  | "GS_REGENERATE_SSH_KEY_CONFIRM_CLICK"
  | "GS_REGENERATE_SSH_KEY_MORE_CLICK"
  | "GS_SWITCH_BRANCH"
  | "ADMIN_SETTINGS_CLICK"
  | "ADMIN_SETTINGS_RESET"
  | "ADMIN_SETTINGS_SAVE"
  | "ADMIN_SETTINGS_ERROR"
  | "ADMIN_SETTINGS_DISCONNECT_AUTH_METHOD"
  | "ADMIN_SETTINGS_UPGRADE_AUTH_METHOD"
  | "ADMIN_SETTINGS_EDIT_AUTH_METHOD"
  | "ADMIN_SETTINGS_ENABLE_AUTH_METHOD"
  | "ADMIN_SETTINGS_UPGRADE_HOOK"
  | "BILLING_UPGRADE_ADMIN_SETTINGS"
  | "AUDIT_LOGS_UPGRADE_ADMIN_SETTINGS"
  | "GAC_UPGRADE_CLICK_ADMIN_SETTINGS"
  | "PROVISIONING_UPGRADE_ADMIN_SETTINGS"
  | "REFLOW_BETA_FLAG"
  | "CONTAINER_JUMP"
  | "CONNECT_GIT_CLICK"
  | "REPO_URL_EDIT"
  | "GENERATE_KEY_BUTTON_CLICK"
  | "COPY_SSH_KEY_BUTTON_CLICK"
  | "LEARN_MORE_LINK_FOR_REMOTEURL_CLICK"
  | "LEARN_MORE_LINK_FOR_SSH_CLICK"
  | "DEFAULT_CONFIGURATION_EDIT_BUTTON_CLICK"
  | "DEFAULT_CONFIGURATION_CHECKBOX_TOGGLED"
  | "CONNECT_BUTTON_ON_GIT_SYNC_MODAL_CLICK"
  | "DATASOURCE_AUTH_COMPLETE"
  | "APP_THEMING_CHOOSE_THEME"
  | "APP_THEMING_APPLY_THEME"
  | "APP_THEMING_CUSTOMIZE_THEME"
  | "APP_THEMING_SAVE_THEME_START"
  | "APP_THEMING_SAVE_THEME_SUCCESS"
  | "APP_THEMING_DELETE_THEME"
  | "RECONNECTING_DATASOURCE_ITEM_CLICK"
  | "ADD_MISSING_DATASOURCE_LINK_CLICK"
  | "RECONNECTING_SKIP_TO_APPLICATION_BUTTON_CLICK"
  | "TEMPLATE_FILTER_SELECTED"
  | "MANUAL_UPGRADE_CLICK"
  | "PAGE_NOT_FOUND"
  | "SIMILAR_TEMPLATE_CLICK"
  | "TEMPLATES_TAB_CLICK"
  | "PROPERTY_PANE_KEYPRESS"
  | "PAGE_NAME_CLICK"
  | "BACK_BUTTON_CLICK"
  | "WIDGET_TAB_CLICK"
  | "ENTITY_EXPLORER_CLICK"
  | "ADMIN_SETTINGS_UPGRADE_WATERMARK"
  | "ADMIN_SETTINGS_UPGRADE"
  | "PRETTIFY_CODE_MANUAL_TRIGGER"
  | "PRETTIFY_CODE_KEYBOARD_SHORTCUT"
  | "JS_OBJECT_CREATED"
  | "JS_OBJECT_FUNCTION_ADDED"
  | "JS_OBJECT_FUNCTION_RUN"
  | "JS_OBJECT_SETTINGS_CHANGED"
  | "SHOW_BINDINGS_TRIGGERED"
  | "BINDING_COPIED"
  | "AUTO_HEIGHT_OVERLAY_HANDLES_UPDATE"
  | "ENTITY_EXPLORER_ADD_PAGE_CLICK"
  | "CANVAS_BLANK_PAGE_CTA_CLICK"
  | "BRANDING_UPGRADE_CLICK"
  | "BRANDING_PROPERTY_UPDATE"
  | "BRANDING_SUBMIT_CLICK"
  | "Cmd+Click Navigation"
  | "WIDGET_PROPERTY_SEARCH"
  | "PEEK_OVERLAY_OPENED"
  | "PEEK_OVERLAY_COLLAPSE_EXPAND_CLICK"
  | "PEEK_OVERLAY_VALUE_COPIED"
  | LIBRARY_EVENTS
  | "APP_SETTINGS_BUTTON_CLICK"
  | "APP_SETTINGS_SECTION_CLICK"
  | APP_NAVIGATION_EVENT_NAMES
  | ACTION_SELECTOR_EVENT_NAMES
  | "PRETTIFY_AND_SAVE_KEYBOARD_SHORTCUT"
  | "OPEN_DOCS"
  | "RESTORE_SNAPSHOT"
  | "CONVERSION_FAILURE"
  | "CONVERT_AUTO_TO_FIXED"
  | "CONVERT_FIXED_TO_AUTO"
  | "DATASOURCE_AUTHORIZE_CLICK"
  | "NAVIGATE_TO_CREATE_NEW_DATASOURCE_PAGE"
  | "EDIT_DATASOURCE_CLICK"
  | "DISCARD_DATASOURCE_CHANGES"
  | "TEST_DATA_SOURCE_FAILED"
  | "DATASOURCE_SCHEMA_FETCH"
  | "SWITCH_ENVIRONMENT"
  | "DEPLOY_WITH_GIT_DISMISS_ENV_MESSAGE"
  | "CANCEL_DEPLOY_WITHOUT_GIT"
  | "DEPLOY_WITHOUT_GIT_DISMISS_ENV_MESSAGE"
  | "EDIT_ACTION_CLICK"
  | "QUERY_TEMPLATE_SELECTED"
  | "RUN_API_FAILURE"
  | "RUN_QUERY_FAILURE"
  | "RUN_SAAS_API_FAILURE"
  | "EXECUTE_ACTION_SUCCESS"
  | "EXECUTE_ACTION_FAILURE"
  | "GOOGLE_SHEET_FILE_PICKER_INITIATED"
  | "GOOGLE_SHEET_FILE_PICKER_FILES_LISTED"
  | "GOOGLE_SHEET_FILE_PICKER_CANCEL"
  | "GOOGLE_SHEET_FILE_PICKER_PICKED"
  | "TELEMETRY_DISABLED"
  | "GENERAL_SETTINGS_UPDATE"
  | "HELP_MENU_WELCOME_TOUR_CLICK"
  | "DISPLAY_TELEMETRY_CALLOUT"
  | "VISIT_ADMIN_SETTINGS_TELEMETRY_CALLOUT"
  | "LEARN_MORE_TELEMETRY_CALLOUT"
  | ONE_CLICK_BINDING_EVENT_NAMES
  | "JS_VARIABLE_CREATED"
  | "JS_VARIABLE_MUTATED"
  | "EXPLORER_WIDGET_CLICK"
  | "WIDGET_SEARCH"
  | "MAKE_APPLICATION_PUBLIC"
  | WALKTHROUGH_EVENTS
  | DATASOURCE_SCHEMA_EVENTS
  | VERSION_UPDATE_EVENTS
  | "SW_REGISTRATION_SUCCESS"
  | "SW_REGISTRATION_FAILED"
  | "SAVE_ACTION"
  | "EMAIL_VERIFICATION_SETTING_UPDATE"
  | "EMAIL_VERIFICATION_FAILED";

export type DATASOURCE_SCHEMA_EVENTS =
  | "DATASOURCE_SCHEMA_SEARCH"
  | "DATASOURCE_SCHEMA_TABLE_SELECT"
  | "AUTOMATIC_QUERY_GENERATION"
  | "GSHEET_GENERATE_PAGE_BUTTON_CLICKED"
  | "GSHEET_PREVIEW_SPREADSHEET_CHANGE"
  | "GSHEET_PREVIEW_SHEET_CHANGE"
  | "GSHEET_PREVIEW_DATA_SHOWN"
  | "DATASOURCE_GENERATE_PAGE_BUTTON_CLICKED"
  | "DATASOURCE_PREVIEW_TABLE_CHANGE"
  | "DATASOURCE_PREVIEW_DATA_SHOWN";

type WALKTHROUGH_EVENTS = "WALKTHROUGH_DISMISSED" | "WALKTHROUGH_SHOWN";

export type LIBRARY_EVENTS =
  | "INSTALL_LIBRARY"
  | "DEFINITIONS_GENERATION"
  | "UNINSTALL_LIBRARY"
  | "EDIT_LIBRARY_URL";

export type APP_NAVIGATION_EVENT_NAMES =
  | "APP_NAVIGATION_SHOW_NAV"
  | "APP_NAVIGATION_ORIENTATION"
  | "APP_NAVIGATION_VARIANT"
  | "APP_NAVIGATION_BACKGROUND_COLOR"
  | "APP_NAVIGATION_SHOW_SIGN_IN";

export type ACTION_SELECTOR_EVENT_NAMES =
  | "ACTION_ADDED"
  | "ACTION_DELETED"
  | "ACTION_MODIFIED";

export type ONE_CLICK_BINDING_EVENT_NAMES =
  | "BIND_EXISTING_QUERY_TO_WIDGET"
  | "GENERATE_QUERY_FOR_WIDGET"
  | "BIND_OTHER_ACTIONS"
  | "GENERATE_QUERY_SELECT_DATA_TABLE"
  | "GENERATE_QUERY_SET_COLUMN"
  | "GENERATE_QUERY_CONNECT_DATA_CLICK"
  | "QUERY_GENERATION_BINDING_SUCCESS"
  | "1_CLICK_BINDING_SUCCESS"
  | "WIDGET_CONNECT_DATA_CLICK"
  | "GENERATE_QUERY_SELECT_SHEET_GSHEET";

export type VERSION_UPDATE_EVENTS =
  | "VERSION_UPDATE_SHOWN"
  | "VERSION_UPDATE_REQUESTED"
  | "VERSION_UPDATE_SUCCESS"
  | "VERSION_UPDATED_FAILED";
