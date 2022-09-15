using System.Collections.Generic;
using System.Text.Json;
using TechTalk.SpecFlow.Assist.Attributes;

namespace Zapisywarka.Api.Test.Interactions.Registrations
{
  public record OfferData
  {
    public string Name { get; set; }

    public IEnumerable<OfferItem> OfferItems { get; set; }

    public override string ToString()
    {
      return JsonSerializer.Serialize<OfferData>(this);
    }

    public record OfferItem
    {
      [TableAliases("Nazwa")]
      public string Name { get; set; }
    }
  }
}