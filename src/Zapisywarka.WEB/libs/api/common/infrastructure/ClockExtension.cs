using NodaTime;
using NodaTime.Extensions;

namespace Zapisywarka.API.Common.Infrastructure
{
  public static class ClockExtension
  {
    public static ZonedClock InWarsaw(this IClock clock)
    {

      return clock.InZone(DateTimeZoneProviders.Tzdb["Europe/Warsaw"]);
    }
  }
}
