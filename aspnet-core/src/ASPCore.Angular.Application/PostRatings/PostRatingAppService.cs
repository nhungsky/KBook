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

        public async Task<float> PutRating(int postId, float rating)
        {
            var postRating = Repository.FirstOrDefault(x => x.PostId == postId && x.CreatorUserId == AbpSession.UserId);
            if (postRating == null)
            {
                postRating = new PostRating();
                postRating.PostId = postId;
            }
            postRating.Rating = rating;
            if (postRating.Id <= 0)
            {
                await Repository.InsertAsync(postRating);
            }
            else
            {
                await Repository.UpdateAsync(postRating);
            }
            var correctQuery = Repository.GetAllList(x => x.PostId == postId &&
                x.CreatorUserId != AbpSession.UserId)
                .Select(x => x.Rating);
            var count = correctQuery.Count() + 1;
            return (correctQuery.DefaultIfEmpty(0).Average() + rating) / count;
        }

        public async Task<List<TopRatingUserDto>> TopRatingUser(int count = 5)
        {
            var allUser = UserRepository.GetAllList().AsQueryable();
            var allPost = PostRepository.GetAllList().AsQueryable();
            var allRating = Repository.GetAllList().AsQueryable();

            var topUserRating = allRating.GroupBy(x => x.PostId)
            .Select(x => new
            {
                PostId = x.Key,
                RatingCount = x.Count(),
                RatingAvrg = x.Select(z => z.Rating).DefaultIfEmpty(0).Average()
            }).Join(allPost,
            r => r.PostId,
            p => p.Id,
            (r, p) => new { r, p })
            .GroupBy(x => x.p.CreatorUserId)
            .Select(x => new
            {
                UserId = x.FirstOrDefault().p.CreatorUserId,
                RatingCount = x.Select(y => y.r.RatingCount).DefaultIfEmpty(0).Sum(),
                RatingAvrg = x.Select(y => y.r.RatingAvrg).DefaultIfEmpty(0).Average()
            }).OrderByDescending(x => x.RatingAvrg).Take(count)
            .Join(allUser,
            r => r.UserId,
            u => u.Id,
            (r, u) => new { r, u })
            .AsEnumerable()
            .Select(x =>
            {
                var res = ObjectMapper.Map<TopRatingUserDto>(x.u);
                res.RatingAvrg = x.r.RatingAvrg;
                res.RatingCount = x.r.RatingCount;
                return res;
            })
            .ToList();

            return ObjectMapper.Map<List<TopRatingUserDto>>(topUserRating);
        }
    }
}
