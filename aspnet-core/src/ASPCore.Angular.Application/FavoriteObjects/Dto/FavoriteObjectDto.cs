using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ASPCore.Angular.Core.FavoriteCreators;

namespace ASPCore.Angular.Application.FavoriteObjects.Dto
{
    [AutoMap(typeof(FavoriteObject))]
    public class FavoriteObjectDto : AuditedEntityDto
    {
        public long ObjectId { get; set; }
        public string ObjectType { get; set; }
    }
}