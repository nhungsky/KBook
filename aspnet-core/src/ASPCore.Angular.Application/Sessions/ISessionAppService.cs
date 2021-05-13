using System.Threading.Tasks;
using Abp.Application.Services;
using ASPCore.Angular.Sessions.Dto;

namespace ASPCore.Angular.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
