using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OffersBD.Models
{
    public class CatalogItem: Entity
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public int? CategoryId { get; set; }

        public decimal? Price { get; set; }

        public int? AvaibleQuantity { get; set; }

        public bool IsDeleted { get; set; } = false;


    }
}
