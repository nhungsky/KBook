using Abp.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Configuration.SiteConfig
{
    public class BaseInfoSettingProvider : SettingProvider
    {
        public const string SITE_NAME = "SITE_NAME";
        public const string SITE_DESCRIPTION = "SITE_DESCRIPTION";
        public const string LOGO_PATH = "LOGO_PATH";
        public const string FAVICON_PATH = "FAVICON_PATH";
        public const string AUTHOR_NAME = "AUTHOR_NAME";
        public const string IMAGE_HOLDER = "IMAGE_HOLDER";
        public const string AUTHOR_LINK = "AUTHOR_LINK";
        public const string HOME_BANNER_LINK = "HOME_BANNER_LINK";
        public override IEnumerable<SettingDefinition> GetSettingDefinitions(SettingDefinitionProviderContext context)
        {
            return new List<SettingDefinition> {
                            new SettingDefinition(
                                SITE_NAME, "Vistark core",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider()),
                            new SettingDefinition(
                                SITE_DESCRIPTION, "ASP .NET Core app develop by Vistark",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider()),
                            new SettingDefinition(
                                LOGO_PATH, "/contents/logo.png",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider()),
                            new SettingDefinition(
                                FAVICON_PATH, "/contents/favicon.ico",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider()),
                            new SettingDefinition(
                                AUTHOR_NAME, "Nguyễn Trọng Nghĩa",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider()),
                            new SettingDefinition(
                                IMAGE_HOLDER, "/contents/holder.png",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider()),
                            new SettingDefinition(
                                HOME_BANNER_LINK, "/contents/temp_banner.jpeg",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider()),
                            new SettingDefinition(
                                AUTHOR_LINK, "https://facebook.com/tx.trongnghia98",
                            scopes: SettingScopes.All,
                            clientVisibilityProvider: new VisibleSettingClientVisibilityProvider())
            };
        }
    }
}
