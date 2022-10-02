
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Zapisywarka.Api.Reservations.Reservations.Features;

namespace Zapisywarka.Api.Reservations.Reservations.Controllers
{
  [Route("offers")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly CreateOffer.CreateOfferHandler createOffer;

    public UsersController(CreateOffer.CreateOfferHandler createOffer)
    {
      this.createOffer = createOffer;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOffer.Command request)
    {     

      var reservedItems = request.OfferItems.Select(item => new CreateOffer.Response.OfferItem("1", item.Name));
      
      var offer = await createOffer.HandleAsync(request);      
     
      return Created("offers/1", offer);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll ()
    {     
      return Ok(new {Name="Offers"});
    }
    


    

    

  }
}


