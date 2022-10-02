namespace Zapisywarka.Api.Reservations.Reservations.Features
{
  public class OfferItemNotFoundException : Exception
  {
    
    public OfferItemNotFoundException(int offerItemId) : base($"Nie znaleziono pozycji oferty o numerze: {offerItemId}")
    {
      
    }
  }
}