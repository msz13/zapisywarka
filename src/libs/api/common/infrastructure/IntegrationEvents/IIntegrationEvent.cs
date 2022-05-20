using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;

namespace Zapisywarka.API.Common.Infrastructure.IntegrationEvents
{
  public class IntegrationEvent
  {
    public Guid Id;
    public Instant OccuredOn;

    public IntegrationEvent(Guid id)
    {
      Id = id;

    }
  }
}
