using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;

namespace Common
{
  public class Quantity : ValueObject
  {
    public Quantity(int value)
    {
      if (value < 0)
      {
        throw new ArgumentOutOfRangeException("Quantity can't be negative");
      }

      Value = value;
    }

    public int Value { get; private set; }

    public static Quantity operator -(Quantity a, Quantity b) => new Quantity(a.Value - b.Value);
    public static Quantity operator +(Quantity a, Quantity b) => new Quantity(a.Value + b.Value);
    public static bool operator >(Quantity a, Quantity b) => a.Value > b.Value;
    public static bool operator <(Quantity a, Quantity b) => a.Value < b.Value;
    public static bool operator <=(Quantity a, Quantity b) => a.Value <= b.Value;
    public static bool operator >=(Quantity a, Quantity b) => a.Value >= b.Value;

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return this.Value;
    }

  }
}
