using System;
using System.Collections.Generic;
using System.Linq;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Registrations
{
  public class ReservationRequest
  {
    public string OfferId { get; internal set; }

    public string ReceptionPassword { get; set; }

    public string Comments { get; set; }

    public IEnumerable<ReservationRequest.ReservationItem> ReservationItems { get; set; }

    public class ReservationItem 
    {
      public string OfferItemId { get; set; }

      public int Quantity { get; set; }

    }
  }

  public class ReservationData
  {
    public class Item
    {
      public string Name { get; set; }
      public int Quantity { get; set; }
    }

    public IEnumerable<ReservationData.Item> Items { get; set; }

    public IEnumerable<ReservationRequest.ReservationItem> ReservationRequestItemsForOffer(CreateOffer.Response offer)
    {
      return Items.Select(item => {
        var offerItemId = offer.OfferItems.Where(offerItem => offerItem.Name == item.Name).SingleOrDefault().OfferItemId;
        return new ReservationRequest.ReservationItem 
        {
          OfferItemId = offerItemId,
          Quantity = item.Quantity
        };
      });
    }
  }
}