using System.Linq;
using System.Threading.Tasks;
using Abp;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Abp.Runtime.Session;
using ASPCore.Angular.Authorization;
using ASPCore.Angular.Authorization.Roles;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.Users.Dto;
using Microsoft.AspNetCore.Identity;

namespace ASPCore.Angular.UserProfile
{
    public class UserProfileAppService : ApplicationService, IUserProfileAppService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<User, long> _userRepository;
        private readonly RoleManager _roleManager;
        private readonly IRepository<Role> _roleRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAbpSession _abpSession;
        private readonly LogInManager _logInManager;

        public UserProfileAppService(UserManager userManager, IRepository<User, long> userRepository,
            RoleManager roleManager, IRepository<Role> roleRepository, IPasswordHasher<User> passwordHasher,
            IAbpSession abpSession, LogInManager logInManager)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _roleManager = roleManager;
            _roleRepository = roleRepository;
            _passwordHasher = passwordHasher;
            _abpSession = abpSession;
            _logInManager = logInManager;
        }

        public async Task<UserDto> GetProfileAsync()
        {
            if (AbpSession.UserId == null)
                throw new AbpException("Mã tài khoản không thể rỗng");

            var currentUser = await _userRepository.GetAsync(AbpSession.UserId.Value);
            var userRoles = await _userManager.GetRolesAsync(currentUser);

            var resultUser = ObjectMapper.Map<UserDto>(currentUser);
            resultUser.RoleNames = userRoles.ToArray();

            return resultUser;
        }

        public async Task<UserDto> UpdateProfileAsync(UserDto input)
        {
            if (AbpSession.UserId == null)
                throw new AbpException("Mã tài khoản không thể rỗng");
            if (AbpSession.UserId != input.Id)
                throw new AbpException("Bạn không có quyền sửa hồ sơ của người khác");

            var user = await _userManager.GetUserByIdAsync(AbpSession.UserId.Value);

            MapToEntity(input, user);

            CheckErrors(await _userManager.UpdateAsync(user));

            if (input.RoleNames != null)
            {
                CheckErrors(await _userManager.SetRolesAsync(user, input.RoleNames));
            }

            return await GetProfileAsync();
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

        private void MapToEntity(UserDto input, User user)
        {
            ObjectMapper.Map(input, user);
            user.SetNormalizedNames();
        }
    }
}