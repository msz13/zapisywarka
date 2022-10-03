using System.Collections.Generic;
using System.Threading.Tasks;
using Zapisywarka.Api.Reservations.Reservations.Features;

namespace Zapisywarka.Api.Reservations.ReservationsApi
{
  public class OffersInMemoryRepository : IOffersRepository
  {

    Dictionary<Guid, Offer> _offers = new Dictionary<Guid, Offer>();
    public OffersInMemoryRepository()
    {
    }



    public Task Add(Offer offer)
    {
      _offers.Add(offer.Id, offer);
      return Task.CompletedTask;
    }

    public Task<Offer> GetById(Guid id)
    {
      return Task.FromResult(_offers.GetValueOrDefault(id));
    }
  }
}