using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Zapisywarka.API.Common.Application
{
    public class LoggingBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        ILoggerFactory _loggerFactory;

        public LoggingBehaviour(ILoggerFactory loggerFactory)
        {
            _loggerFactory = loggerFactory;
        }

        public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var logger = _loggerFactory.CreateLogger("Command_Handler");

            logger.LogInformation($"Executing command: {typeof(TRequest).FullName}");

            var response = next();

            logger.LogInformation($"Handling command response: {typeof(TResponse).FullName}");

            return response;
        }
    }
}
