using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.PostRatings.Dto;
using ASPCore.Angular.Posts;
using ASPCore.Angular.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostRatings
{
    public class PostRatingAppService : AsyncCrudAppService<PostRating, PostRatingDto>, IPostRatingAppService
    {
        private readonly IRepository<User, long> UserRepository;
        private readonly IRepository<Post> PostRepository;
        public PostRatingAppService(IRepository<PostRating> repo,
        IRepository<User, long> userRepository,
        IRepository<Post> postRepository) : base(repo)
        {
            UserRepository = userRepository;
            PostRepository = postRepository;
        }
        public async Task<int> Count()
        {
            return await Repository.CountAsync();
        }

        public async Task<List<UserDto>> TopRatingUser(int count = 5)
        {
            var allUser = UserRepository.GetAllList().AsQueryable();
            var allPost = PostRepository.GetAllList().AsQueryable();
            var allRating = Repository.GetAllList().AsQueryable();

            var topUserRating = allRating.GroupBy(x => x.PostId)
            .Select(x => new
            {
                PostId = x.Key,
                RatingCount = x.Count(),
                RatingAvrg = x.Average(z => z.Rating)
            }).Join(allPost,
            r => r.PostId,
            p => p.Id,
            (r, p) => new { r, p })
            .GroupBy(x => x.p.CreatorUserId)
            .Select(x => new
            {
                UserId = x.FirstOrDefault().p.CreatorUserId,
                RatingCount = x.Sum(y => y.r.RatingCount),
                RatingAvrg = x.Average(y => y.r.RatingAvrg)
            }).OrderByDescending(x => x.RatingAvrg).Take(count)
            .Join(allUser,
            r => r.UserId,
            u => u.Id,
            (r, u) => new { r, u }).Select(x => x.u).ToList();

            return ObjectMapper.Map<List<UserDto>>(topUserRating);
        }
    }
}
