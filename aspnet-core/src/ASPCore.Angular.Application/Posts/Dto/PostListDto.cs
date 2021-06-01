using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Posts.Dto
{
    [AutoMapFrom(typeof(Post))]
    public class PostListDto : EntityDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public int PostCategoryId { get; set; }
        public string Summary { get; set; }
        public string FeatureImage { get; set; }
        public string Tags { get; set; }
    }
}
