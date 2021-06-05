using Abp.Domain.Entities;
using ASPCore.Angular.PlaceCategories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Places
{
    public class Place : Entity, IPassivable
    {
        public string Name { get; set; }
        public string Photos { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public bool IsActive { get; set; }

        public int PlaceCategoryId { get; set; }
        [ForeignKey(nameof(PlaceCategoryId))]
        public PlaceCategory PlaceCategory { get; set; }
    }
}
