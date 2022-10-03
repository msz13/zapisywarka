using System.Threading.Tasks;
using Zapisywarka.Api.Reservations.Reservations.Features;

namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public interface IOffersRepository
  {
    public Task Add(Offer offer);

    public Task<Offer?> GetById(Guid id);
  }
}