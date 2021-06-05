using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using ASPCore.Angular.PlaceCategories;

namespace ASPCore.Angular.Application.PlaceCategories.Dto
{
    [AutoMap(typeof(PlaceCategory))]
    public class PlaceCategoryDto : EntityDto, IPassivable
    {
        public string Name { get; set; }
        public string FeatureImage { get; set; }
        public bool IsActive { get; set; } = true;
    }
}