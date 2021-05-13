using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using ASPCore.Angular.Configuration.Dto;

namespace ASPCore.Angular.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : AngularAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
