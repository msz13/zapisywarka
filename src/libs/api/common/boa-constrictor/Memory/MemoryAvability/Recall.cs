using System;
using Boa.Constrictor.Screenplay;

namespace Boa.Constrictor.Memory
{
  public class Recall<T> : IQuestion<T>
  {
    string _fact;


    public Recall(string fact)
    {
      _fact = fact;
    }
   
     public static IQuestion<T> Fact(string fact)
    {
      return new Recall<T>(fact);
    }
    public T RequestAs(IActor actor)
    {
      return actor.Using<MemoryAbility>().Recall(_fact);
    }

    public override string ToString()
    {
      return $"Actor recalls {_fact}";
    }
    
  }
}


