using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using ASPCore.Angular.PostCategories;
using ASPCore.Angular.PostComments;
using ASPCore.Angular.PostRatings;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Posts
{
    public class Post : AuditedEntity, IPassivable, ISoftDelete
    {
        public string Title { get; set; }
        public int PostCategoryId { get; set; }
        public string Summary { get; set; }
        public string FeatureImage { get; set; }
        public string Tags { get; set; }
        public string Content { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey(nameof(PostCategoryId))]
        public PostCategory PostCategory { get; set; }
    }
}
