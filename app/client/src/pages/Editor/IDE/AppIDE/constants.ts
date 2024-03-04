import {
  EditorState,
  SidebarBottomButtonTitles,
  SidebarTopButtonTitles,
} from "@appsmith/entities/IDE/constants";
import EditorPaneSegments from "../EditorPane/EditorPaneSegments";
import DataSidePane from "../LeftPane/DataSidePane";
import LibrarySidePane from "../LeftPane/LibrarySidePane";
import AppSettingsPane from "../LeftPane/AppSettings";
import {
  APP_LIBRARIES_EDITOR_PATH,
  APP_SETTINGS_EDITOR_PATH,
  DATA_SOURCES_EDITOR_ID_PATH,
  DATA_SOURCES_EDITOR_LIST_PATH,
  INTEGRATION_EDITOR_PATH,
  SAAS_GSHEET_EDITOR_ID_PATH,
} from "@appsmith/constants/routes/appRoutes";

export const states = [
  [
    {
      state: EditorState.EDITOR,
      icon: "editor-v3",
      title: SidebarTopButtonTitles.EDITOR,
      urlSuffix: "",
      component: EditorPaneSegments,
      paths: (path: string) => [path],
    },
    {
      state: EditorState.DATA,
      icon: "datasource-v3",
      title: SidebarTopButtonTitles.DATA,
      urlSuffix: "datasource",
      component: DataSidePane,
      paths: (path: string) => [
        `${path}${DATA_SOURCES_EDITOR_LIST_PATH}`,
        `${path}${DATA_SOURCES_EDITOR_ID_PATH}`,
        `${path}${INTEGRATION_EDITOR_PATH}`,
        `${path}${SAAS_GSHEET_EDITOR_ID_PATH}`,
      ],
    },
  ],
  [
    {
      state: EditorState.LIBRARIES,
      icon: "packages-v3",
      title: SidebarBottomButtonTitles.LIBRARIES,
      urlSuffix: "libraries",
      component: LibrarySidePane,
      paths: (path: string) => [`${path}${APP_LIBRARIES_EDITOR_PATH}`],
    },
    {
      state: EditorState.SETTINGS,
      icon: "settings-v3",
      title: SidebarBottomButtonTitles.SETTINGS,
      urlSuffix: "settings",
      component: AppSettingsPane,
      paths: (path: string) => [`${path}${APP_SETTINGS_EDITOR_PATH}`],
    },
  ],
];
