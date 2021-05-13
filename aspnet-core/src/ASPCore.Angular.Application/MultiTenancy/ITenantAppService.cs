using Abp.Application.Services;
using ASPCore.Angular.MultiTenancy.Dto;

namespace ASPCore.Angular.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

