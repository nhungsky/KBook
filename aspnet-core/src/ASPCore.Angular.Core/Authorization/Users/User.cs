using System;
using System.Collections.Generic;
using Abp.Authorization.Users;
using Abp.Extensions;
using ASPCore.Angular.Enums;

namespace ASPCore.Angular.Authorization.Users
{
    public class User : AbpUser<User>
    {
        public const string DefaultPassword = "123456";

        public string LockReason { get; set; }
        public string Photo { get; set; }
        public string Address { get; set; }
        public string Biography { get; set; }
        public Genders Gender { get; set; }
        public DateTime? Birthday { get; set; }

        public static string CreateRandomPassword()
        {
            return Guid.NewGuid().ToString("N").Truncate(16);
        }

        public static User CreateTenantAdminUser(int tenantId, string emailAddress)
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = AdminUserName,
                Name = AdminUserName,
                Surname = AdminUserName,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>()
            };

            user.SetNormalizedNames();

            return user;
        }
    }
}
