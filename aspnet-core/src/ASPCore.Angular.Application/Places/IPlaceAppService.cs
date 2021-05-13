using Abp.Application.Services;
using ASPCore.Angular.Places.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Places
{
    public interface IPlaceAppService : IAsyncCrudAppService<PlaceDto, int, PagedPlaceResultRequestDto>
    {
        public Task NotApproved(int id);
        public Task Approval(int id);
    }
}
