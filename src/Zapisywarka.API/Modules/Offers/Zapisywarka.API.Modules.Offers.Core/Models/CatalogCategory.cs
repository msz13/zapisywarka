using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OffersBD.Models
{
    public class CatalogCategory: Entity
    {
        public CatalogCategory() { }
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
