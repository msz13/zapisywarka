
using Microsoft.AspNetCore.Mvc;
using Zapisywarka.Api.Reservations.Reservations.Features;
using Zapisywarka.Api.Reservations.ReservationsApi;

namespace Zapisywarka.Api.Reservations.Reservations.Controllers
{
  [Route("offers/{offerId?}/reservations")]
  [ApiController]
  public class ReservationsController : ControllerBase
  {
    ReserveItems.Handler _handler;

   
    public ReservationsController(ReserveItems.Handler handler)
    {
      _handler = handler;
    }

    [HttpPost()]
    public async Task<IActionResult> ReserveItems(string offerId, [FromBody] ReserveItems.ReserveItemDto request)
    { 
      var offerRepo = new OffersInMemoryRepository();   
      var command = new ReserveItems.Command {
        OfferId = offerId,
        ReceptionPassword = request.ReceptionPassword,
        Comments = request.Comments,
        ReservationItems = request.ReservationItems
      };
      var reservation = await _handler.Handle(command);
      
      return Created("offers/1/reservations/1", reservation);
    }
  
   

  }
}