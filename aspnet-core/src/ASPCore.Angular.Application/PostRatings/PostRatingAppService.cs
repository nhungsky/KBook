using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.PostRatings.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostRatings
{
    public class PostRatingAppService : AsyncCrudAppService<PostRating, PostRatingDto>, IPostRatingAppService
    {
        public PostRatingAppService(IRepository<PostRating> repo) : base(repo)
        {

        }
    }
}
