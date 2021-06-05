using Abp.Application.Services;
using ASPCore.Angular.PostRatings.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostRatings
{
    public interface IPostRatingAppService : IAsyncCrudAppService<PostRatingDto>
    {
        public Task<int> Count();
    }
}
