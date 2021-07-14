using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ASPCore.Angular.Application.PlaceCategories.Dto;
using ASPCore.Angular.PlaceCategories;

namespace ASPCore.Angular.Places.Dto
{
    [AutoMapFrom(typeof(Place))]
    [AutoMapTo(typeof(Place))]
    public class PlaceDto : EntityDto, IPassivable
    {
        [Required] public string Name { get; set; }
        public string Photos { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        [Required] public float Latitude { get; set; }
        [Required] public float Longitude { get; set; }
        public int PlaceCategoryId { get; set; }
        public bool IsActive { get; set; }
        public PlaceCategoryDto PlaceCategory { get; set; }
    }
}