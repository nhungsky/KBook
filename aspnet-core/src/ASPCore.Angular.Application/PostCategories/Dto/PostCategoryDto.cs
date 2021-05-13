using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostCategories.Dto
{
    [AutoMapFrom(typeof(PostCategory))]
    [AutoMapTo(typeof(PostCategory))]
    public class PostCategoryDto : EntityDto
    {
        [Required]
        public string Name { get; set; }
        [Required]

        public string Slug { get; set; }
        public string Description { get; set; }
    }
}
