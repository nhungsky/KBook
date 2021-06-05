using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.Application.PlaceCategories.Dto;
using ASPCore.Angular.PlaceCategories;

namespace ASPCore.Angular.Application.PlaceCategories
{
    public class PlaceCategoryAppService : AsyncCrudAppService<PlaceCategory, PlaceCategoryDto, int, PagedPlaceCategoryResultRequestDto>, IPlaceCategoryAppService
    {
        public PlaceCategoryAppService(IRepository<PlaceCategory> repo) : base(repo)
        {

        }
    }
}