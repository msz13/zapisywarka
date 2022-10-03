namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class OfferNotFoundException : Exception
  {
    public OfferNotFoundException(string? offerId) : base($"Nie znaleziono oferty o numerze Id: {offerId}")
    {
    }
  }
}