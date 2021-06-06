using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ASPCore.Angular.Posts.Dto;
using ASPCore.Angular.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Posts
{
    public interface IPostAppService : IAsyncCrudAppService<PostDto, int, PagedPostResultRequestDto>
    {
        public Task NotApproved(int id);
        public Task Approval(int id);
        public PagedResultDto<PostListDto> GetListSimple(PagedPostResultRequestDto input);
        public PagedResultDto<PostDisplayDto> GetPostsLanding(PagedPostResultRequestDto inpt);

        public Task<int> Count();
        public Task<List<TopCreatorDto>> TopCreator(int count = 5);
    }
}
