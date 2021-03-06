using System.Threading.Tasks;
using Abp.Application.Services;
using ASPCore.Angular.Application.PlaceCategories.Dto;

namespace ASPCore.Angular.Application.PlaceCategories
{
    public interface IPlaceCategoryAppService : IAsyncCrudAppService<PlaceCategoryDto, int, PagedPlaceCategoryResultRequestDto>
    {
        public Task<int> Count();
    }
}