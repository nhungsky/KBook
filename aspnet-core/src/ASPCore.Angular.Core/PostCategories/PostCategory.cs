﻿using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.PostCategories
{
    public class PostCategory : Entity
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
    }
}
