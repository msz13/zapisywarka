using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using TechTalk.SpecFlow.Assist.Attributes;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Registrations
{
  public class ReservationRequest
  {
    public string OfferId { get; internal set; }

    public string ReceptionPassword { get; set; }

    public string Comments { get; set; }

    public IEnumerable<ReservationRequest.ReservationItem> ReservationItems { get; set; }

    public override string ToString()
    {
      return JsonSerializer.Serialize<ReservationRequest>(this);
    }

    public class ReservationItem
    {
      public string OfferItemId { get; set; }

      public int Quantity { get; set; }

    }

  }

  public class ReservationDetails
  {
    [TableAliases("Numer rezerwacji")]
    public string ReservationNumber { get; set; }

    public string OfferId { get; set; }

    public string ReceptionPassword { get; set; }

    public string Comments { get; set; }

    public IEnumerable<ReservedItem> ReservedItems { get; set; }

    [TableAliases("Data złożenia")]
    public string CreatedAt { get; set; }

    public class ReservedItem
    {
      [TableAliases("Nazwa")]
      public string OfferItemId { get; set; }

       [TableAliases("Ilość")]
      public int Quantity { get; set; }

    }

  }

  public class ReservationRequestBuilder
  {
    CreateOffer.Response _offer;
    IEnumerable<ReservationRequestBuilder.Item> _items { get; set; }

    private string _password;

    private string _comments;

    public ReservationRequestBuilder ForOffer(CreateOffer.Response offer)
    {
      _offer = offer;
      return this;
    }

    public ReservationRequestBuilder WithItems(IEnumerable<ReservationRequestBuilder.Item> items)
    {
      _items = items;
      return this;
    }

    public ReservationRequestBuilder WithPassword(string password)
    {
      _password = password;
      return this;
    }

    public ReservationRequestBuilder WithComments(string comments)
    {
      _comments = comments;
      return this;
    }

    public ReservationRequest Build()
    {
      var items = _items.Select(item =>
      {
        var offerItem = _offer.OfferItems.Where(offerItem => offerItem.Name == item.Name).SingleOrDefault();        
        if (offerItem == null) throw new ArgumentNullException("offer items are null");
        return new ReservationRequest.ReservationItem
        {
          OfferItemId = offerItem.Id,
          Quantity = item.Quantity
        };
      });

      return new ReservationRequest
      {
        OfferId = _offer.Id,
        ReservationItems = items,
        ReceptionPassword = _password,
        Comments = _comments
      };

    }


    public class Item
    {
      [TableAliases("Nazwa")]
      public string Name { get; set; }

      [TableAliases("Ilość")]
      public int Quantity { get; set; }
    }
   
  }
}