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
    [AutoMapTo(typeof(Post))]
    public class PostDto : EntityDto, IPassivable, ISoftDelete
    {
        [Required]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string FeatureImage { get; set; }
        public string Tags { get; set; }
        [Required]
        public string Content { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
