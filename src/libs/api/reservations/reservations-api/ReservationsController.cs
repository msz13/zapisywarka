
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
        ReservationNumber = "ABC-2022",
        ReceptionPassword = request.ReceptionPassword,
        Comments = request.Comments,        
        ReservedItems = request.ReservationItems.Select(item => new ReserveItems.ReservationDetails.ReservedItem(item.OfferItemId, item.Quantity)),        
        CreatedAt = "2020/08/20 15:00"

      };
      return Created("offers/1/reservations/1", reservation);
    }
  
   

  }
}