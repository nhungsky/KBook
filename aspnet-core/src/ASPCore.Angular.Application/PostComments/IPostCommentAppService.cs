using Abp.Application.Services;
using ASPCore.Angular.PostComments.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostComments
{
    public interface IPostCommentAppService : IAsyncCrudAppService<PostCommentDto>
    {
    }
}
