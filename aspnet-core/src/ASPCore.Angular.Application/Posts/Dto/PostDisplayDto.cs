using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ASPCore.Angular.PostCategories.Dto;
using ASPCore.Angular.PostComments.Dto;
using ASPCore.Angular.Users.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Posts.Dto
{
    [AutoMapFrom(typeof(Post))]
    public class PostDisplayDto : AuditedEntityDto
    {
        public string Title { get; set; }
        public int PostCategoryId { get; set; }
        public string Summary { get; set; }
        public string FeatureImage { get; set; }
        public string Tags { get; set; }
        //==============================================//
        public float PostRatingAvrg { get; set; }
        public int PostRatingCount { get; set; }
        public int PostCommentCount { get; set; }
        //==============================================//
        public UserDto Creator { get; set; }
        public PostCategoryDto PostCategory { get; set; }
        public List<PostCommentDto> LatestSomeComments { get; set; }

    }
}
