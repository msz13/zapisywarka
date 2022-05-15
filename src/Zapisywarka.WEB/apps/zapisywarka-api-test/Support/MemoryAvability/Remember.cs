using Boa.Constrictor.Screenplay;

namespace ZapisywarkaApi.AcceptanceTests.Helpers
{
  class Remember : ITask
  {
    string _factName;
    dynamic _value;

    public Remember(string factName, dynamic value)
    {
      _factName = factName;
      _value = value;
    }

    public static Remember Fact(string factName, dynamic value)
    {
      return new Remember(factName, value);
    }
    public void PerformAs(IActor actor)
    {
      actor.Using<MemoryAbility>().Remember(_factName, _value);
    }

    public override string ToString()
    {
      return $"remembers fact {_factName} with value: {_value}";
    }

  }
}
