export * from "ce/pages/UserAuth/ThirdPartyAuth";
import { default as ThirdPartyAuth } from "ce/pages/UserAuth/ThirdPartyAuth";
import { getAppsmithConfigs } from "@appsmith/configs";
import { ThirdPartyLoginRegistry } from "pages/UserAuth/ThirdPartyLoginRegistry";
const { enableOidcOAuth, enableSamlOAuth } = getAppsmithConfigs();

export const SocialLoginTypes = {
  SAML: "saml",
  OIDC: "oidc",
};

if (enableSamlOAuth) ThirdPartyLoginRegistry.register(SocialLoginTypes.SAML);
if (enableOidcOAuth) ThirdPartyLoginRegistry.register(SocialLoginTypes.OIDC);

export default ThirdPartyAuth;
