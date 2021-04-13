using System;
using System.Collections.Generic;
using System.Text;

namespace OffersBD.Models
{
    public class OfferItem
    {
        public OfferItem(int catalogItemId, decimal price, int quantity)
        {
            CatalogItemId = catalogItemId;
            Price = price;
            Quantity = quantity;
        }

        public string TenantId { get; set; }
        public int Id { get; set; }
        
        public int CatalogItemId { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}
