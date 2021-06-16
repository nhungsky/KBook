using System.Drawing.Printing;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.Application.PlaceCategories.Dto;
using ASPCore.Angular.PlaceCategories;

namespace ASPCore.Angular.Application.PlaceCategories
{
    public class PlaceCategoryAppService :
        AsyncCrudAppService<PlaceCategory, PlaceCategoryDto, int, PagedPlaceCategoryResultRequestDto>,
        IPlaceCategoryAppService
    {
        public PlaceCategoryAppService(IRepository<PlaceCategory> repo) : base(repo)
        {
        }

        protected override IQueryable<PlaceCategory> CreateFilteredQuery(PagedPlaceCategoryResultRequestDto input)
        {
            var query = base.CreateFilteredQuery(input)
                .Where(x => input.IsActive == null || x.IsActive == input.IsActive);
            if (!string.IsNullOrEmpty(input.Keyword))
            {
                query = query.Where(x => x.Name.ToLower().Contains(input.Keyword.ToLower()));
            }

            return query;
        }

        public async Task<int> Count()
        {
            return await Repository.CountAsync(x => x.IsActive);
        }
    }
}