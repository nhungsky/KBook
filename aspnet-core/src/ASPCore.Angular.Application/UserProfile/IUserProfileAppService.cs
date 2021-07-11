using System.Threading.Tasks;
using Abp.Application.Services;
using ASPCore.Angular.Users.Dto;

namespace ASPCore.Angular.UserProfile
{
    public interface IUserProfileAppService : IApplicationService
    {
        Task<UserDto> GetProfileAsync();
    }
}