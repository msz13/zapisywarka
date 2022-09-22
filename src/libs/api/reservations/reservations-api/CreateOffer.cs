
namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class CreateOffer
  {
    public record Command
    {
      public string Name { get; set; }

      public IEnumerable<OfferItem> OfferItems { get; set; }
      

      public record OfferItem
      {       
        public string Name { get; set; }
      }
    }

    public class Response
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<Response.OfferItem> OfferItems { get; set; }

        public record OfferItem (string Id, string Name);
        
    }

    internal class CreateOfferHandler
    {
      
    }

  }
}