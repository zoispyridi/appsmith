export * from "ce/utils/adminSettingsHelpers";
import { getAppsmithConfigs } from "@appsmith/configs";
import type { User } from "constants/userConstants";
import {
  ADMIN_SETTINGS_CATEGORY_ACL_PATH,
  ADMIN_SETTINGS_CATEGORY_AUDIT_LOGS_PATH,
  ADMIN_SETTINGS_CATEGORY_DEFAULT_PATH,
} from "constants/routes";
import {
  PERMISSION_TYPE,
  LOGIC_FILTER,
  isPermitted,
} from "@appsmith/utils/permissionHelpers";
import {
  OIDCOAuthURL,
  KeycloakOAuthURL,
  GoogleOAuthURL,
  GithubOAuthURL,
} from "@appsmith/constants/ApiConstants";

const { disableLoginForm, enableOidcOAuth, enableSamlOAuth } =
  getAppsmithConfigs();

export const saveAllowed = (settings: any, socialLoginList: string[]) => {
  const connectedMethodsCount =
    socialLoginList.length +
    (disableLoginForm ? 0 : 1) +
    (enableOidcOAuth ? 1 : 0) +
    (enableSamlOAuth ? 1 : 0);
  if (connectedMethodsCount === 1) {
    const checkFormLogin = !(
        "APPSMITH_FORM_LOGIN_DISABLED" in settings || disableLoginForm
      ),
      checkGoogleAuth =
        settings["APPSMITH_OAUTH2_GOOGLE_CLIENT_ID"] !== "" &&
        socialLoginList.includes("google"),
      checkGithubAuth =
        settings["APPSMITH_OAUTH2_GITHUB_CLIENT_ID"] !== "" &&
        socialLoginList.includes("github"),
      checkOidcAuth =
        settings["APPSMITH_OAUTH2_OIDC_CLIENT_ID"] !== "" && enableOidcOAuth;

    return (
      checkFormLogin ||
      checkGoogleAuth ||
      checkGithubAuth ||
      checkOidcAuth ||
      enableSamlOAuth
    );
  } else {
    return connectedMethodsCount >= 2;
  }
};

export const getDefaultAdminSettingsPath = ({
  isSuperUser,
  tenantPermissions = [],
}: Record<string, any>): string => {
  const redirectToAuditLogs = isPermitted(
    tenantPermissions,
    PERMISSION_TYPE.READ_AUDIT_LOGS,
  );
  const redirectToGroups = isPermitted(
    tenantPermissions,
    [
      PERMISSION_TYPE.TENANT_READ_PERMISSION_GROUPS,
      PERMISSION_TYPE.TENANT_READ_USER_GROUPS,
    ],
    LOGIC_FILTER.OR,
  );
  if (isSuperUser) {
    return ADMIN_SETTINGS_CATEGORY_DEFAULT_PATH;
  } else if (redirectToAuditLogs && !redirectToGroups) {
    return ADMIN_SETTINGS_CATEGORY_AUDIT_LOGS_PATH;
  } else {
    return ADMIN_SETTINGS_CATEGORY_ACL_PATH;
  }
};

export const showAdminSettings = (user?: User): boolean =>
  user?.adminSettingsVisible || false;

export const getLoginUrl = (method: string): string => {
  const urls: Record<string, string> = {
    oidc: OIDCOAuthURL,
    saml: KeycloakOAuthURL,
    google: GoogleOAuthURL,
    github: GithubOAuthURL,
  };

  return urls[method];
};
