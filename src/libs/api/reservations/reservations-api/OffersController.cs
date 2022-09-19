
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Zapisywarka.Api.Reservations.Reservations.Features;

namespace Zapisywarka.Api.Reservations.Reservations.Controllers
{
  [Route("offers")]
  [ApiController]
  public class UsersController : ControllerBase
  {

    public UsersController()
    {
   
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOffer.Command request)
    {     

      var reservedItems = request.OfferItems.Select(item => new CreateOffer.Response.OfferItem("1", item.Name));
      var offer = new CreateOffer.Response 
      {
        Id = "1",
        Name = request.Name,
        OfferItems = reservedItems       
      };
      
      return Created("offers/1", offer);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll ()
    {     
      return Ok(new {Name="Offers"});
    }
    


    

    

  }
}


