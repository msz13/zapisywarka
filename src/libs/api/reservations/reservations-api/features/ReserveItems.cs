
using System.Globalization;
using NodaTime;
using Zapisywarka.API.Common.Infrastructure;

namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class ReserveItems
  {
    public class ReserveItemDto
    {

      public string ReceptionPassword { get; set; }

      public string Comments { get; set; }

      public IEnumerable<ReserveItemDto.ReservationItem> ReservationItems { get; set; }

      public record struct ReservationItem(int OfferItemId, int Quantity);

    }

    public class Command : ReserveItemDto
    {
      public string OfferId { get; set; }
    }

    public class ReservationDetails
    {
      public string ReservationNumber { get; set; }

      public string OfferId { get; set; }

      public string ReceptionPassword { get; set; }

      public string Comments { get; set; }

      public IEnumerable<ReservedItem> ReservedItems { get; set; }

      public string CreatedAt { get; set; }

      public record struct ReservedItem(string Name, int Quantity);

    }

    public class Handler
    {
      IOffersRepository _offerRepo;
      private IClock _clock;

     
      public Handler(IOffersRepository offerRepo, IClock clock) 
      {
        _clock = clock;
        _offerRepo = offerRepo;
      }

      public async Task<ReservationDetails> Handle(Command request)
      {

        var offer = await _offerRepo.GetById(Guid.Parse(request.OfferId));
        if (offer is null) 
        {
          throw  new OfferNotFoundException(request.OfferId);
        }


        offer.VerifyIfContainsOfferItems(request.ReservationItems);
         
             

        return new ReserveItems.ReservationDetails
        {
          OfferId = request.OfferId,
          ReservationNumber = "ABC-2022",
          ReceptionPassword = request.ReceptionPassword,
          Comments = request.Comments,
          ReservedItems = request.ReservationItems.Select(item =>
          {
            var offerItem = offer.Items.Single((offerItem => offerItem.Position == item.OfferItemId));
                        
            return new ReserveItems.ReservationDetails.ReservedItem(offerItem.Name, item.Quantity);
          }),
          CreatedAt = _clock.InWarsaw().GetCurrentLocalDateTime().ToString("yyyy-MM-dd HH:mm", CultureInfo.GetCultureInfo("pl"))

        };
      }
    }
  }
}