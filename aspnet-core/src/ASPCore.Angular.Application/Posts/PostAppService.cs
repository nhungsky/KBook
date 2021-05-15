using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using ASPCore.Angular.Posts.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Posts
{
    public class PostAppService : AsyncCrudAppService<Post, PostDto, int, PagedPostResultRequestDto>, IPostAppService
    {
        public PostAppService(IRepository<Post> repo) : base(repo)
        {

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


    }
}
