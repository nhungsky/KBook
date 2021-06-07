using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using ASPCore.Angular.Authorization.Users;

namespace ASPCore.Angular.Core.FavoriteCreators
{
    public class FavoriteObject : AuditedEntity
    {
        public long ObjectId { get; set; }
        public string ObjectType { get; set; }
    }
}