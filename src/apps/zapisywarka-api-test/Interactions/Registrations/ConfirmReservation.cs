
using Boa.Constrictor.Screenplay;
using Zapisywarka.API.AcceptanceTests.Interactions.Registrations;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Registrations
{
  public class ConfirmReservation
  {
    public static ITaskAsync With(ReservationRequest request)
    {
        return TestTask.WhereAsync("Confirm Reservation");  
    }
  }
}