using System;
using Zapisywarka.API.Common.Infrastructure.IntegrationEvents;

namespace OffersBD.Features.Offers
{
    internal class OfferPublishedEvent : IntegrationEvent
    {
        public OfferPublishedEvent() : base(Guid.NewGuid())
        {
        }
    }
}