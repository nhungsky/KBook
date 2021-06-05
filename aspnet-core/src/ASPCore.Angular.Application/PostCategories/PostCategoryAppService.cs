using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.PostCategories.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostCategories
{
    public class PostCategoryAppService : AsyncCrudAppService<PostCategory, PostCategoryDto, int, PagedPostCategoryResultRequestDto>, IPostCategoryAppService
    {
        public PostCategoryAppService(IRepository<PostCategory> repo) : base(repo) { }
        public async Task<int> Count()
        {
            return await Repository.CountAsync();
        }
    }
}
