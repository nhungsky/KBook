using Abp.Authorization;
using ASPCore.Angular.Authorization.Roles;
using ASPCore.Angular.Authorization.Users;

namespace ASPCore.Angular.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
