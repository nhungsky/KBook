using Abp.Application.Services;
using ASPCore.Angular.PostRatings.Dto;
using ASPCore.Angular.Users.Dto;
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
        public Task<List<TopRatingUserDto>> TopRatingUser(int count = 5);
        public Task<float> PutRating(int postId, float rating);
    }
}
