
namespace Zapisywarka.Api.Reservations.Reservations.Features;

internal class OffersRepository : IOffersRepository
{

  ReservationsContext _context;

  public OffersRepository(ReservationsContext context)
  {
    _context = context;
  }

  public Task Add(Offer offer)
  {
    throw new NotImplementedException();
  }

  public async Task<Offer?> GetById(Guid id)
  {
    return await _context.Offers.FindAsync(id);
  }
}