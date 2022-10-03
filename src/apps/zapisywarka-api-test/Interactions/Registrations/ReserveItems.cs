
using Boa.Constrictor.RestSharp;
using Boa.Constrictor.Screenplay;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Registrations
{
    public class ReserveItems
    {
        public static ITaskAsync With(string offerId, ReservationRequest request)
        {
            return TestTask.WhereAsync($"reserve items with request{request}", 
            Post.To($"offers/{offerId}/reservations").With<ReservationRequest>(request));
        }
    }
}