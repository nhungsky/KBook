using System;
using System.Collections.Generic;
using Abp.Domain.Entities;
using ASPCore.Angular.Places;

namespace ASPCore.Angular.PlaceCategories
{
    public class PlaceCategory: Entity, IPassivable
    {
        public string Name { get; set; }
        public string FeatureImage { get; set; }
        public bool IsActive { get; set; } = true;

        public ICollection<Place> Places { get; set; }
    }
}
