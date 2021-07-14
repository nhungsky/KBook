using Abp.Application.Services.Dto;

namespace ASPCore.Angular.PostComments.Dto
{
    public class PagedPostCommentResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public int? PostId { get; set; }
    }
}