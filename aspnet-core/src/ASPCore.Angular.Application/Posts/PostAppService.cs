using Abp.Application.Services;
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
