using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;

namespace Zapisywarka.API.Common.Infrastructure
{
  public class ClockService : IClock
  {
    IClock _clock;

    public ClockService()
    {
      _clock = SystemClock.Instance;
    }
    public Instant GetCurrentInstant()
    {
      return _clock.GetCurrentInstant();
    }
  }
}
