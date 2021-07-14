using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.Places.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using ASPCore.Angular.Application.PlaceCategories.Dto;
using ASPCore.Angular.PlaceCategories;

namespace ASPCore.Angular.Places
{
    public class PlaceAppService : AsyncCrudAppService<Place, PlaceDto, int, PagedPlaceResultRequestDto>,
        IPlaceAppService
    {
        private readonly IRepository<PlaceCategory> _placeCategoryService;

        public PlaceAppService(IRepository<Place> repo, IRepository<PlaceCategory> placeCategoryService) : base(repo)
        {
            _placeCategoryService = placeCategoryService;
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

        public override async Task<PagedResultDto<PlaceDto>> GetAllAsync(PagedPlaceResultRequestDto input)
        {
            var placeCategories = _placeCategoryService.GetAll().Where(x => x.IsActive).ToList();
            var res = await base.GetAllAsync(input);
            for (int i = 0; i < res.Items.Count; i++)
            {
                var placeCategory = placeCategories.FirstOrDefault(x => x.Id == res.Items[i].PlaceCategoryId);
                if (placeCategory != null)
                {
                    res.Items[i].PlaceCategory = ObjectMapper.Map<PlaceCategoryDto>(placeCategory);
                }
            }

            return res;
        }
    }
}