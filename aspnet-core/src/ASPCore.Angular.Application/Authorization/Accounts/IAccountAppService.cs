using System.Threading.Tasks;
using Abp.Application.Services;
using ASPCore.Angular.Authorization.Accounts.Dto;

namespace ASPCore.Angular.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
