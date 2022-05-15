using System;
using System.Collections.Generic;
using System.Text;

namespace Zapisywarka.API.Common.Application
{
  public class ValidationException : Exception
  {
    public List<string> Errors { get; }
    public ValidationException(List<string> errors) : base(String.Join(", ", errors))
    {
      this.Errors = errors;
      ;
    }
  }
}
