using Abp.Domain.Entities.Auditing;
using ASPCore.Angular.Posts;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPCore.Angular.PostRatings
{
    public class PostRating : AuditedEntity
    {
        public int PostId { get; set; }
        public float Rating { get; set; }
    }
}
