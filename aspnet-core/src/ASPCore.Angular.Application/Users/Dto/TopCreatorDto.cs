using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.Enums;

namespace ASPCore.Angular.Users.Dto
{
    [AutoMapFrom(typeof(User))]
    public class TopCreatorDto : EntityDto<long>
    {
        [Required]
        [StringLength(AbpUserBase.MaxUserNameLength)]
        public string UserName { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }
        public bool IsActive { get; set; }

        public string FullName { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public DateTime CreationTime { get; set; }

        public string[] RoleNames { get; set; }

        public string LockReason { get; set; }
        public string Photo { get; set; }
        public string Address { get; set; }
        public string Biography { get; set; }
        public Genders Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public int PostCount { get; set; } = 0;
    }
}
