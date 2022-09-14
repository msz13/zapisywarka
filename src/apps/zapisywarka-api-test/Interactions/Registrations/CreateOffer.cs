
using System;
using System.Collections.Generic;
using Boa.Constrictor.Screenplay;
using Zapisywarka.Api.Test.Interactions.Registrations;

namespace Zapisywarka.API.AcceptanceTests.Interactions.Registrations
{
  public class CreateOffer
  {
    internal static ITaskAsync With(OfferData offerData)
    {
      throw new NotImplementedException();
    }

    public class Response
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<Response.OfferItem> OfferItems { get; set; }

        public class OfferItem
        {
            public string OfferItemId { get; set; }

            public string Name { get; set; }

        }
    }
  }
}