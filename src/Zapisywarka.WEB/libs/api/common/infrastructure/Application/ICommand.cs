using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Zapisywarka.API.Common.Infrastructure.Application
{
  public interface ICommand : IRequest
  {
    string TenantId { get; set; }
  }

  public interface ICommand<TResult> : IRequest<TResult>
  {
    string TenantId { get; set; }
  }
}
