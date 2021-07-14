using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.PostComments.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.Users.Dto;

namespace ASPCore.Angular.PostComments
{
    public class PostCommentAppService : AsyncCrudAppService<PostComment, PostCommentDto>, IPostCommentAppService
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

        public override async Task<PagedResultDto<PostCommentDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
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