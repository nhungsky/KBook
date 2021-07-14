using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.PostComments.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Extensions;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.Users.Dto;

namespace ASPCore.Angular.PostComments
{
    public class PostCommentAppService :
        AsyncCrudAppService<PostComment, PostCommentDto, int, PagedPostCommentResultRequestDto>, IPostCommentAppService
    {
        private readonly IRepository<User, long> _userRepository;

        public PostCommentAppService(IRepository<PostComment> repo, IRepository<User, long> userRepository) : base(repo)
        {
            _userRepository = userRepository;
        }

        public async Task<int> Count()
        {
            return await Repository.CountAsync();
        }

        protected override IQueryable<PostComment> CreateFilteredQuery(PagedPostCommentResultRequestDto input)
        {
            var query = base.CreateFilteredQuery(input);
            if (input.PostId != null && input.PostId > 0)
            {
                query = query.Where(x => x.PostId == input.PostId.Value);
            }

            if (!input.Keyword.IsNullOrEmpty())
            {
                query = query.Where(x => x.Comment.ToLower().Contains(input.Keyword.ToLower()));
            }

            return query;
        }

        public override async Task<PagedResultDto<PostCommentDto>> GetAllAsync(PagedPostCommentResultRequestDto input)
        {
            var result = await base.GetAllAsync(input);
            for (int i = 0; i < result.Items.Count; i++)
            {
                if (result.Items[i].CreatorUserId is > 0)
                {
                    var user = await _userRepository.GetAsync(result.Items[i].CreatorUserId.Value);
                    if (user != null)
                    {
                        result.Items[i].User = ObjectMapper.Map<UserDto>(user);
                    }
                }
            }

            return result;
        }
    }
}