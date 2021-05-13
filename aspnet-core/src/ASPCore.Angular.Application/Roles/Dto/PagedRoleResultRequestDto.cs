using Abp.Application.Services.Dto;

namespace ASPCore.Angular.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

