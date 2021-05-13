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
    public class PlaceAppService : AsyncCrudAppService<Place, PlaceDto, int, PagedPlaceResultRequestDto>, IPlaceAppService
    {
        public PlaceAppService(IRepository<Place> repo) : base(repo) { }

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
    }
}
