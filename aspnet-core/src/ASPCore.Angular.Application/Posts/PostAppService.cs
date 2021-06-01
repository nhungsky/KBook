using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.PostCategories;
using ASPCore.Angular.PostCategories.Dto;
using ASPCore.Angular.PostComments;
using ASPCore.Angular.PostComments.Dto;
using ASPCore.Angular.PostRatings;
using ASPCore.Angular.Posts.Dto;
using ASPCore.Angular.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Posts
{
    public class PostAppService : AsyncCrudAppService<Post, PostDto, int, PagedPostResultRequestDto>, IPostAppService
    {
        private readonly IRepository<User, long> UserRepository;
        private readonly IRepository<PostCategory> PostCategoryRepository;
        private readonly IRepository<PostComment> PostCommentRepository;
        private readonly IRepository<PostRating> PostRatingRepository;
        public PostAppService(IRepository<Post> repo,
            IRepository<User, long> userRepository,
            IRepository<PostCategory> postCategoryRepository,
            IRepository<PostComment> postCommentRepository,
            IRepository<PostRating> postRatingRepository) : base(repo)
        {
            UserRepository = userRepository;
            PostCategoryRepository = postCategoryRepository;
            PostCommentRepository = postCommentRepository;
            PostRatingRepository = postRatingRepository;
        }

        protected override IQueryable<Post> CreateFilteredQuery(PagedPostResultRequestDto input)
        {
            var query = base.CreateFilteredQuery(input)
                .Where(x => input.IsActive == null || input.IsActive == x.IsActive)
                .Where(x => input.PostCategoryId == null || x.PostCategoryId == input.PostCategoryId);
            if (!string.IsNullOrEmpty(input.Keyword))
            {
                query = query.Where(x => x.Title.Contains(input.Keyword));
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

        public PagedResultDto<PostListDto> GetListSimple(PagedPostResultRequestDto input)
        {
            var query = CreateFilteredQuery(input);
            query = ApplySorting(query, input);
            var postResult = ApplyPaging(query, input).ToList();
            var result = new PagedResultDto<PostListDto>
            {
                Items = ObjectMapper.Map<List<PostListDto>>(postResult),
                TotalCount = query.Count(),
            };
            return result;
        }

        public async Task NotApproved(int id)
        {
            var current = Repository.Get(id);
            if (current == null)
                return;
            current.IsActive = false;
            await Repository.UpdateAsync(current);
        }

        public PagedResultDto<PostDisplayDto> GetPostsLanding(PagedPostResultRequestDto inpt)
        {
            var query = CreateFilteredQuery(inpt);
            query = ApplySorting(query, inpt);
            var postResult = ApplyPaging(query, inpt).ToList();
            var result = new PagedResultDto<PostDisplayDto>
            {
                Items = ObjectMapper.Map<List<PostDisplayDto>>(postResult),
                TotalCount = query.Count(),
            };
            // Lặp trong từng bài viết lấy được
            for (int i = 0; i < result.Items.Count; i++)
            {
                // Lấy thông tin người tạo
                var creator = UserRepository.Get(result.Items[i].CreatorUserId.Value);
                if (creator != null)
                    result.Items[i].Creator = ObjectMapper.Map<UserDto>(creator);
                // Lấy thông tin chủ đề
                var category = PostCategoryRepository.Get(result.Items[i].PostCategoryId);
                if (category != null)
                    result.Items[i].PostCategory = ObjectMapper.Map<PostCategoryDto>(category);
                // Đếm sách comments
                result.Items[i].PostCommentCount = PostCommentRepository.Count(x => x.PostId == result.Items[i].Id);
                // Lấy danh sách 3 comment mới nhất
                result.Items[i].LatestSomeComments = ObjectMapper.Map<List<PostCommentDto>>(PostCommentRepository
                    .GetAllList(x => x.PostId == result.Items[i].Id).Take(3).ToList());
                // Đếm số sao
                result.Items[i].PostRatingCount = PostRatingRepository.Count(x => x.PostId == result.Items[i].Id);
                // Tính số sao trungg bình
                result.Items[i].PostRatingAvrg = PostRatingRepository
                    .GetAllList(x => x.PostId == result.Items[i].Id).Average(x => x.Rating);
            }
            return result;
        }
    }
}
