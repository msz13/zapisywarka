
using Microsoft.AspNetCore.Mvc;
using Zapisywarka.Api.Reservations.Reservations.Features;

namespace Zapisywarka.Api.Reservations.Reservations.Controllers
{
  [Route("offers/{offerId?}/reservations")]
  [ApiController]
  public class ReservationsController : ControllerBase
  {

    public ReservationsController()
    {
   
    }

    [HttpPost()]
    public async Task<IActionResult> ReserveItems(string offerId, [FromBody] ReserveItems.Command request)
    {    
      var reservation = new ReserveItems.ReservationDetails
      {
        OfferId = offerId,
        ReservationNumber = "001",
        ReceptionPassword = request.ReceptionPassword,
        Comments = request.Comments,        
        ReservedItems = request.ReservationItems.Select(item => new ReserveItems.ReservationDetails.ReservedItem(item.OfferItemId, item.Quantity)),
        
        CreatedAt = DateTime.Now.ToString()

      };
      return Created("offers/1/reservations/1", reservation);
    }
  
   

  }
}