
namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class CreateOffer
  {
    public record Command
    {     

      public IEnumerable<OfferItem> OfferItems { get; set; }
      

      public record OfferItem
      {       
        public string Name { get; set; }
      }
    }

    public class Response
    {
        public string Id { get; set; }
       // public string Name { get; set; }

        public IEnumerable<Response.OfferItem> OfferItems { get; set; }

        public record OfferItem (string Id, string Name);
        
    }

    public class CreateOfferHandler
    {
      ReservationsContext dbContext;

      public CreateOfferHandler(ReservationsContext dbContext)
      {
        this.dbContext = dbContext;
      }

      public async Task<Response> HandleAsync(Command request)
      {
        var items = request.OfferItems.Select((item, i) => new OfferItem(i+1, item.Name) );
       //var items = request.OfferItems.Select((item) => new OfferItem(item.Name) );
       Console.WriteLine("offer items: "+items.ToList()[0].Position + ", "+items.ToList()[1].Position+", "+items.ToList()[2].Position);
        var offer = new Offer(
          Guid.NewGuid(),
          items.ToList()
        );
        await dbContext.Offers.AddAsync(offer);

        await dbContext.SaveChangesAsync();

        return new Response {
          Id = offer.Id.ToString(),
          OfferItems = offer.Items.Select(item => new Response.OfferItem(item.Position.ToString(), item.Name))
        };
      }
    }

  }
}