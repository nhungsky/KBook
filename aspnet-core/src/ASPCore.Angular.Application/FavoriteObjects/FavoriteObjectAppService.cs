using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ASPCore.Angular.Application.FavoriteObjects.Dto;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.Core.FavoriteCreators;
using ASPCore.Angular.Core.FavoriteObjecs;
using ASPCore.Angular.PostCategories;
using ASPCore.Angular.PostCategories.Dto;
using ASPCore.Angular.PostComments;
using ASPCore.Angular.PostComments.Dto;
using ASPCore.Angular.PostRatings;
using ASPCore.Angular.Posts;
using ASPCore.Angular.Posts.Dto;
using ASPCore.Angular.Users.Dto;

namespace ASPCore.Angular.Application.FavoriteObjects
{
    public class FavoriteObjectAppService :
    AsyncCrudAppService<FavoriteObject, FavoriteObjectDto, int, PagedFavoriteObjectResultRequestDto>,
    IFavoriteObjectAppService
    {
        private readonly IRepository<User, long> UserRepository;
        private readonly IRepository<PostCategory> PostCategoryRepository;
        private readonly IRepository<PostComment> PostCommentRepository;
        private readonly IRepository<PostRating> PostRatingRepository;
        private readonly IRepository<Post> PostRepository;

        public FavoriteObjectAppService(IRepository<FavoriteObject> repo,
        IRepository<User, long> userRepository,
        IRepository<PostCategory> postCategoryRepository,
        IRepository<PostComment> postCommentRepository,
        IRepository<PostRating> postRatingRepository,
        IRepository<Post> postRepository
        ) : base(repo)
        {
            UserRepository = userRepository;
            PostCategoryRepository = postCategoryRepository;
            PostCommentRepository = postCommentRepository;
            PostRatingRepository = postRatingRepository;
            PostRepository = postRepository;
        }

        public List<long> GetFavoritePostIds()
        {
            return Repository.GetAllList(x => x.CreatorUserId == AbpSession.UserId &&
            x.ObjectType == FavoriteTypes.FAVORITE_POST)
            .Select(x => x.ObjectId).DefaultIfEmpty().ToList();
        }

        public async Task<PagedResultDto<PostDisplayDto>> GetFavoritePosts(PagedFavoriteObjectResultRequestDto inp)
        {
            var favoritePost = Repository.GetAllList(x => x.CreatorUserId == AbpSession.UserId &&
            x.ObjectType == FavoriteTypes.FAVORITE_POST).Select(x => x.ObjectId).ToArray();

            var query = PostRepository.GetAllList(x => favoritePost.Contains(x.Id));
            var postResult = query.Skip(inp.SkipCount).Take(inp.MaxResultCount);
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
                // Lấy sao mà bản thân đã đánh giá
                result.Items[i].YourRating = PostRatingRepository.FirstOrDefault(x => x.PostId == result.Items[i].Id &&
                x.CreatorUserId == AbpSession.UserId)?.Rating ?? 0F;
                // Tính số sao trung bình
                result.Items[i].PostRatingAvrg = PostRatingRepository
                    .GetAllList(x => x.PostId == result.Items[i].Id).Select(x => x.Rating).DefaultIfEmpty(0).Average();
            }
            return result;
        }

        public List<long> GetFavoriteUserIds()
        {
            return Repository.GetAllList(x => x.CreatorUserId == AbpSession.UserId &&
            x.ObjectType == FavoriteTypes.FAVORITE_USER)
            .Select(x => x.ObjectId).DefaultIfEmpty().ToList();
        }

        public async Task<PagedResultDto<UserDto>> GetFavoriteUsers(PagedFavoriteObjectResultRequestDto inp)
        {
            var favoriteUsers = Repository.GetAllList(x => x.CreatorUserId == AbpSession.UserId &&
            x.ObjectType == FavoriteTypes.FAVORITE_USER).Select(x => x.ObjectId).ToArray();

            var query = UserRepository.GetAllList(x => favoriteUsers.Contains(x.Id));
            var userResult = query.Skip(inp.SkipCount).Take(inp.MaxResultCount);
            var result = new PagedResultDto<UserDto>
            {
                Items = ObjectMapper.Map<List<UserDto>>(userResult),
                TotalCount = query.Count(),
            };
            return result;
        }

        public async Task<PostDisplayDto> PutFavoritePost(int postId)
        {
            var current = Repository.FirstOrDefault(x => x.ObjectId == postId &&
            x.CreatorUserId == AbpSession.UserId &&
            x.ObjectType == FavoriteTypes.FAVORITE_POST);
            if (current == null)
            {
                current = new FavoriteObject
                {
                    ObjectId = postId,
                    ObjectType = FavoriteTypes.FAVORITE_POST
                };
            }
            if (current.Id <= 0)
            {
                await Repository.InsertAsync(current);
            }
            else
            {
                await Repository.UpdateAsync(current);
            }

            var currentPost = ObjectMapper.Map<PostDisplayDto>(PostRepository.Get(postId));
            // Lấy thông tin người tạo
            var creator = UserRepository.Get(currentPost.CreatorUserId.Value);
            if (creator != null)
                currentPost.Creator = ObjectMapper.Map<UserDto>(creator);
            // Lấy thông tin chủ đề
            var category = PostCategoryRepository.Get(currentPost.PostCategoryId);
            if (category != null)
                currentPost.PostCategory = ObjectMapper.Map<PostCategoryDto>(category);
            // Đếm sách comments
            currentPost.PostCommentCount = PostCommentRepository.Count(x => x.PostId == currentPost.Id);
            // Lấy danh sách 3 comment mới nhất
            currentPost.LatestSomeComments = ObjectMapper.Map<List<PostCommentDto>>(PostCommentRepository
                .GetAllList(x => x.PostId == currentPost.Id).Take(3).ToList());
            // Đếm số sao
            currentPost.PostRatingCount = PostRatingRepository.Count(x => x.PostId == currentPost.Id);
            // Lấy sao mà bản thân đã đánh giá
            currentPost.YourRating = PostRatingRepository.FirstOrDefault(x => x.PostId == currentPost.Id &&
            x.CreatorUserId == AbpSession.UserId)?.Rating ?? 0F;
            // Tính số sao trung bình
            currentPost.PostRatingAvrg = PostRatingRepository
                .GetAllList(x => x.PostId == currentPost.Id).Select(x => x.Rating).DefaultIfEmpty(0).Average();
            return currentPost;
        }

        public async Task<UserDto> PutFavoriteUser(long userId)
        {
            var current = Repository.FirstOrDefault(x => x.ObjectId == userId &&
                        x.CreatorUserId == AbpSession.UserId &&
                        x.ObjectType == FavoriteTypes.FAVORITE_USER);
            if (current == null)
            {
                current = new FavoriteObject
                {
                    ObjectId = userId,
                    ObjectType = FavoriteTypes.FAVORITE_USER
                };
            }
            if (current.Id <= 0)
            {
                await Repository.InsertAsync(current);
            }
            else
            {
                await Repository.UpdateAsync(current);
            }

            return ObjectMapper.Map<UserDto>(UserRepository.Get(userId));
        }

        public async Task<int> RemoveFavoritePost(int postId)
        {
            var current = await Repository.FirstOrDefaultAsync(x =>
            x.CreatorUserId == AbpSession.UserId &&
            x.ObjectId == postId &&
            x.ObjectType == FavoriteTypes.FAVORITE_POST
            );
            if (current != null)
            {
                await Repository.DeleteAsync(current);
            }
            return postId;
        }

        public async Task<long> RemoveFavoriteUser(long userId)
        {
            var current = await Repository.FirstOrDefaultAsync(x =>
            x.CreatorUserId == AbpSession.UserId &&
            x.ObjectId == userId &&
            x.ObjectType == FavoriteTypes.FAVORITE_USER
            );
            if (current != null)
            {
                await Repository.DeleteAsync(current);
            }
            return userId;
        }
    }
}