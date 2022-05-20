using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;

namespace OffersBD.Models
{
    public class Offer: Entity
    {
        public string Id { get; set; } //string albo int

        public string Name { get; set; }

        public LocalDateTime EndRegistrationDate { get; set; } 

        public LocalDateTime StartCollectionDate { get; set; }

        public LocalDateTime EndCollectionDate { get; set; }

        public IList<OfferItem> OfferItems { get; set; }
    }
}
