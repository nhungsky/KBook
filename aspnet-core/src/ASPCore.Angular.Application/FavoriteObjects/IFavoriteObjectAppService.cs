using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ASPCore.Angular.Application.FavoriteObjects.Dto;
using ASPCore.Angular.Core.FavoriteCreators;
using ASPCore.Angular.Posts.Dto;
using ASPCore.Angular.Users.Dto;

namespace ASPCore.Angular.Application.FavoriteObjects
{
    public interface IFavoriteObjectAppService : IAsyncCrudAppService<FavoriteObjectDto, int, PagedFavoriteObjectResultRequestDto>
    {
        public List<long> GetFavoriteUserIds();
        public Task<PagedResultDto<UserDto>> GetFavoriteUsers(PagedFavoriteObjectResultRequestDto inp);
        public Task<UserDto> PutFavoriteUser(long userId);
        public Task<long> RemoveFavoriteUser(long UserId);

        public List<long> GetFavoritePostIds();
        public Task<PagedResultDto<PostDisplayDto>> GetFavoritePosts(PagedFavoriteObjectResultRequestDto inp);
        public Task<PostDisplayDto> PutFavoritePost(int postId);
        public Task<int> RemoveFavoritePost(int postId);
    }
}