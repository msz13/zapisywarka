using Boa.Constrictor.WebDriver;
using OpenQA.Selenium;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Registrations;


public class RegistrationForm
{
    public static IWebLocator OfferName => WebLocator.L("Offer name", By.CssSelector("[data-testid=form-name]"));

}
