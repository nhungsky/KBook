using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ASPCore.Angular.Posts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using ASPCore.Angular.Users.Dto;

namespace ASPCore.Angular.PostComments.Dto
{
    [AutoMapFrom(typeof(PostComment))]
    [AutoMapTo(typeof(PostComment))]
    public class PostCommentDto : AuditedEntityDto
    {
        public int PostId { get; set; }
        public string ImagePath { get; set; }
        public string Comment { get; set; }
        public UserDto User { get; set; }
    }
}