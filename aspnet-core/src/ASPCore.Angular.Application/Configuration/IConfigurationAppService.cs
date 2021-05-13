using System.Threading.Tasks;
using ASPCore.Angular.Configuration.Dto;

namespace ASPCore.Angular.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
