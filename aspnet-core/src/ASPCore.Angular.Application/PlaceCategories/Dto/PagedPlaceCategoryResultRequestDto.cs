using Abp.Application.Services.Dto;

namespace ASPCore.Angular.Application.PlaceCategories.Dto
{
    public class PagedPlaceCategoryResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}