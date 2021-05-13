using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using ASPCore.Angular.Posts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostComments
{
    public class PostComment : AuditedEntity
    {
        public int PostId { get; set; }
        public string ImagePath { get; set; }
        public string Comment { get; set; }
    }
}
