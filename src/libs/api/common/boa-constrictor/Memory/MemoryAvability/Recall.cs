using System;
using Boa.Constrictor.Screenplay;

namespace Boa.Constrictor.Memory
{
  internal class Recall : IQuestion<object>
  {
    string _fact;


    public Recall(string fact)
    {
      _fact = fact;
    }

    internal static Recall Fact(string fact)
    {
      return new Recall(fact);
    }
    public object RequestAs(IActor actor)
    {
      return actor.Using<MemoryAbility>().Recall(_fact);
    }

    public override string ToString()
    {
      return $"Actor recalls {_fact}";
    }


  }
}


