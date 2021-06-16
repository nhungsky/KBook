using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.PostCategories.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp;

namespace ASPCore.Angular.PostCategories
{
    public class PostCategoryAppService :
        AsyncCrudAppService<PostCategory, PostCategoryDto, int, PagedPostCategoryResultRequestDto>,
        IPostCategoryAppService
    {
        public PostCategoryAppService(IRepository<PostCategory> repo) : base(repo)
        {
        }

        public async Task<int> Count()
        {
            return await Repository.CountAsync();
        }

        public async Task<PostCategoryDto> GetBySlug(string slug)
        {
            if (string.IsNullOrEmpty(slug))
            {
                throw new AbpException("Slug can not be null or empty!");
            }
            else
            {
                var currentPc = await Repository.FirstOrDefaultAsync(x => x.Slug == slug);
                if (currentPc == null)
                {
                    throw new AbpException("Slug can not be null or empty!");
                }

                return MapToEntityDto(currentPc);
            }
        }
    }
}