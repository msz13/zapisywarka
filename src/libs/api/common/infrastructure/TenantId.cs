using System;

namespace Zapisywarka.API.Common.Infrastructure
{
  public class TenantId : Identity
  {
    public TenantId() : base()
    { }

    public TenantId(string id) : base(id)
    { }

    public TenantId(Guid id) : base(id)
    { }
  }
}
