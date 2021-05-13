using Abp.Application.Services;
using Abp.Domain.Repositories;
using ASPCore.Angular.PostComments.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostComments
{
    public class PostCommentAppService : AsyncCrudAppService<PostComment, PostCommentDto>, IPostCommentAppService
    {
        public PostCommentAppService(IRepository<PostComment> repo) : base(repo) { }
    }
}
