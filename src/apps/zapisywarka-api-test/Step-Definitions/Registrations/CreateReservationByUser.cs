using System;
using System.Collections.Generic;
using Boa.Constrictor.Screenplay;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using TechTalk.SpecFlow.Infrastructure;
using Zapisywarka.Api.Test.Interactions.Registrations;
using Zapisywarka.API.AcceptanceTests.Interactions.Registrations;
using Zapisywarka.API.AcceptanceTests.Interactions.Identity;
using System.Threading.Tasks;
using Boa.Constrictor.RestSharp;
using CSharpFunctionalExtensions;
using FluentAssertions;

namespace MyNamespace
{
  [Binding]
  public class StepDefinitions
  {

    private readonly ISpecFlowOutputHelper _specFlowOutputHelper;
    private IActor andrew;
    private Result<CreateOffer.Response> _offer;

    public StepDefinitions()
    {

    }

    public StepDefinitions(ISpecFlowOutputHelper specFlowOutputHelper, Cast cast)
    {
      _specFlowOutputHelper = specFlowOutputHelper;
      andrew = cast.actorNamed("Andrew");

    }

     [Given(@"Koordynator zapisów ""(.*)"" jest zalogowany")]
    public async Task GivenKoordynatorZapisowJestZalogowanyAsync(string andrzej0)
    {
        var credentials = new UserCredentials();
        await andrew.AttemptsToAsync(CreateUserAccount.With(credentials));
        await andrew.AttemptsToAsync(Login.WithCredentials(credentials));
    } 

    [Given(@"Dostępny jest formularz zapisów, na ofertę ""(.*)"" zawierającą następujące pozycje:")]
    public async void GivenDostepnyJestFormularzZapisowNaOferteZawierajacaNastepujacePozycje(string offerName, Table table)
    {     

      var offerRequest = new OfferData
      {
        Name = offerName,
        OfferItems = table.CreateSet<OfferData.OfferItem>()
      };

        await andrew.AttemptsToAsync(CreateOffer.With(offerRequest));
        _offer = LastResponse<Result<CreateOffer.Response>>.Result().RequestAs(andrew).Value;
       
      
    }

   /*   [Given(@"Jest ""(.*)""")]
    public void GivenJest(string p0)
    {

    } */

    [Given(@"Jan, przyjmujący zapisy, w ramach oferty ""(.*)"" rezerwuje dla klienta następujące pozycje:")]
    public void GivenJanPrzyjmujacyZapisyWRamachOfertyRezerwujeDlaKlientaNastepujacePozycje(string poniedziałek0, Table table)
    {
        var offerResponse = new CreateOffer.Response {
            Name = "Test1",
            Id = "13",
            OfferItems = new List<CreateOffer.Response.OfferItem>{
                new CreateOffer.Response.OfferItem {
                    OfferItemId = "1",
                    Name = "Chleb wiejski"
                },
                new CreateOffer.Response.OfferItem {
                    OfferItemId = "2",
                    Name = "Chleb foremkowy z żurawiną"
                }
            }
        };

        var request = new ReservationRequestBuilder()
            .ForOffer(offerResponse)
            .WithPassword("Kowalski")
            .WithComments("Przyjdzie żona")
            .WithItems(table.CreateSet<ReservationRequestBuilder.Item>())
            .Build();

        _specFlowOutputHelper.WriteLine(request.ToString());

     //  throw new NotImplementedException();

    }

/*
    [Given(@"wprowadza dane rezerwacji:")]
    public void GivenWprowadzaDaneRezerwacji(Table table)
    {

    }

    [When(@"Zatwierdza rezerwację")]
    public void WhenZatwierdzaRezerwacje()
    {

    }

    [Then(@"Rezerwacja jest zapisana i zawiera powyższe informacje")]
    public void ThenRezerwacjaJestZapisanaIZawieraPowyzszeInformacje()
    {

    }

    [Then(@"Dodatkowe dane:")]
    public void ThenDodatkoweDane(Table table)
    {

    } */

  }

}