using System;
using System.Collections.Generic;
using System.Text;

namespace Zapisywarka.API.Common.Infrastructure.Infrastructure
{
  public class UserContextService : IUsercontextService
  {
    public UserContextService() { }

    public string GetTenantId() => "92252701-0819-4485-b7d3-af2d79efb462";
  }
}
