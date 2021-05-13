using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostRatings.Dto
{
    [AutoMapFrom(typeof(PostRating))]
    [AutoMapTo(typeof(PostRating))]
    public class PostRatingDto : EntityDto
    {
        public int PostId { get; set; }
        public float Rating { get; set; }
    }
}
