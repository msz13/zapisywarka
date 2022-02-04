using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Zapisywarka.API.Common.Infrastructure.IntegrationEvents
{
    public class EventBus
    {


        public EventBus()
        {

        }

        public async Task Publish<TEvent>(TEvent @event) where TEvent : class
        {

        }
    }
}
