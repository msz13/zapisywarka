using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using NodaTime.Testing;
using NUnit.Framework;
using Zapisywarka.Api.Reservations.Reservations.Features;


namespace Zapisywarka.Api.Reservations.ReservationsApi.Test;


public class ReserveItemsTest
{
  ReserveItems.Handler handler;
  OffersInMemoryRepository offersRepo;

  FakeClock clock;

  [SetUp]
  public void Setup()
  {
    clock = new FakeClock(NodaTime.Instant.FromDateTimeUtc(new DateTime(2022,09,30,13,30,5, DateTimeKind.Utc)));
    offersRepo = new OffersInMemoryRepository();
    handler = new ReserveItems.Handler(offersRepo, clock);
  }

  [Test]
  public async Task ShouldCreateResponse()
  {
    

    var offer = new Offer(Guid.NewGuid(), new List<OfferItem> {
            new OfferItem(1, "Item1"),
            new OfferItem(2, "Item2")
        });
    await offersRepo.Add(offer);    

    var request = new ReserveItems.Command
    {
      OfferId = offer.Id.ToString(),
      ReceptionPassword = "Test",
      Comments = "Komentarz",
      ReservationItems = new ReserveItems.ReserveItemDto.ReservationItem[] { new ReserveItems.ReserveItemDto.ReservationItem(1, 20) }
    };

    

    var response = await handler.Handle(request);

    var expectedResponse = new ReserveItems.ReservationDetails
    {
      ReceptionPassword = request.ReceptionPassword,
      Comments = request.Comments,
      OfferId = offer.Id.ToString(),
      ReservationNumber = "ABC-2022",
      CreatedAt = "2022-09-30 15:30",
      ReservedItems = request.ReservationItems.Select(i => new ReserveItems.ReservationDetails.ReservedItem("Item1", 20))
    };

    response.Should().BeEquivalentTo(expectedResponse);


  }

  [Test]
  public void ShouldThrowWhenOfferIsNotFound()
  {
    var offerId = Guid.NewGuid().ToString();
    var request = new ReserveItems.Command
    {
      OfferId = offerId,
      ReceptionPassword = "Test",
      Comments = "Komentarz",
      ReservationItems = new ReserveItems.ReserveItemDto.ReservationItem[] { 
        new ReserveItems.ReserveItemDto.ReservationItem(1, 20),         
        }
    };

    FluentActions.Awaiting(async () => await handler.Handle(request)).Should().Throw<OfferNotFoundException>()
        .WithMessage($"Nie znaleziono oferty o numerze Id: {offerId}");

  }

  [Test]
  public async Task ShouldThrowWhenOfferItemIsNotFound()
  {
    var offer = new Offer(Guid.NewGuid(), new List<OfferItem> {
            new OfferItem(1, "Item1"),
            new OfferItem(2, "Item2")
        });
    await offersRepo.Add(offer);  

    var request = new ReserveItems.Command
    {
      OfferId = offer.Id.ToString(),
      ReceptionPassword = "Test",
      Comments = "Komentarz",
      ReservationItems = new ReserveItems.ReserveItemDto.ReservationItem[] { 
       // new ReserveItems.ReserveItemDto.ReservationItem(1, 20), 
        new ReserveItems.ReserveItemDto.ReservationItem(3, 2) 
        }
    };

  /*   var action = async ()=> await handler.Handle(request);
    await action.Should().ThrowAsync<OfferItemNotFoundException>(); */

    FluentActions.Awaiting(async () => await handler.Handle(request))
        .Should().Throw<OfferItemNotFoundException>()
        .WithMessage($"Nie znaleziono pozycji oferty o numerze: {3}"); 

  }

   


}