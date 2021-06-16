using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.Places.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Places
{
    public class PlaceAppService : AsyncCrudAppService<Place, PlaceDto, int, PagedPlaceResultRequestDto>,
        IPlaceAppService
    {
        public PlaceAppService(IRepository<Place> repo) : base(repo)
        {
        }

        protected override IQueryable<Place> CreateFilteredQuery(PagedPlaceResultRequestDto input)
        {
            var query = base.CreateFilteredQuery(input)
                .Where(x => (input.Keyword == null || input.Keyword.Length == 0 || x.Name.Contains(input.Keyword)) &&
                            (input.IsActive == null || x.IsActive == input.IsActive));
            if (input.PlaceCategoryId != null && input.PlaceCategoryId > 0)
            {
                query = query.Where(x => x.PlaceCategoryId == input.PlaceCategoryId);
            }

            return query;
        }   

        public async Task Approval(int id)
        {
            var current = Repository.Get(id);
            if (current == null)
                return;
            current.IsActive = true;
            await Repository.UpdateAsync(current);
        }

        public async Task NotApproved(int id)
        {
            var current = Repository.Get(id);
            if (current == null)
                return;
            current.IsActive = false;
            await Repository.UpdateAsync(current);
        }

        public async Task<int> Count()
        {
            return await Repository.CountAsync(x => x.IsActive);
        }
    }
}