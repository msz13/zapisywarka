using System.Collections.Generic;

namespace Zapisywarka.Api.Test.Interactions.Registrations
{
  public class OfferData
  {
    public string Name { get; set; }

    public IEnumerable<OfferItem> OfferItems { get; set; }

    public class OfferItem
    {
      public string Name { get; set; }
    }
  }
}