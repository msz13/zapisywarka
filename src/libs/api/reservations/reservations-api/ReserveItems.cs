
namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class ReserveItems
  {
    public class Command
    {

      public string OfferId { get; internal set; }

      public string ReceptionPassword { get; set; }

      public string Comments { get; set; }

      public IEnumerable<Command.ReservationItem> ReservationItems { get; set; }
    
      public record struct ReservationItem(string OfferItemId, int Quantity);
      


    }

    public class ReservationDetails
    {
      public string ReservationNumber { get; set; }

      public string OfferId { get; set; }

      public string ReceptionPassword { get; set; }

      public string Comments { get; set; }

      public IEnumerable<ReservedItem> ReservedItems { get; set; }

      public string CreatedAt { get; internal set; }

      public record struct ReservedItem(string OfferItemId, int Quantity);
     
    }
  }
}