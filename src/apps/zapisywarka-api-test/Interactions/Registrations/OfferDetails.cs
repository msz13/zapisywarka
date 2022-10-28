using Boa.Constrictor.Screenplay;
using Boa.Constrictor.WebDriver;
using Zapisywarka.Api.Test.Interactions.Registrations;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Registrations
{
  internal class OfferDetails : IQuestion<OfferData>
  {

    internal static IQuestion<OfferData> FromReservationsForm()
    {
      return new OfferDetails();
    }

    public OfferData RequestAs(IActor actor)
    {
      return new OfferData 
      {
        Name = Text.Of(RegistrationForm.OfferName).RequestAs(actor),
      };
    }

    public override string ToString()
    {
      return "offer details from ofer reservation form";
    }
  }
}