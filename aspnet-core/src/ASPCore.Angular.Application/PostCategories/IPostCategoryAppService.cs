using Abp.Application.Services;
using ASPCore.Angular.PostCategories.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostCategories
{
    public interface
        IPostCategoryAppService : IAsyncCrudAppService<PostCategoryDto, int, PagedPostCategoryResultRequestDto>
    {
        public Task<int> Count();
        public Task<PostCategoryDto> GetBySlug(string slug);
    }
}