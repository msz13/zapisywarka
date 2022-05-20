using System.Collections.Generic;
using Boa.Constrictor.Screenplay;
using System;

namespace ZapisywarkaApi.AcceptanceTests.Helpers
{
  public class MemoryAbility : IAbility
  {
    private Dictionary<string, dynamic> memory = new Dictionary<string, dynamic>();

    public MemoryAbility()
    {
    }

    public void Remember(string name, dynamic fact)
    {
      dynamic factToSave = fact;

      memory.Add(name, fact);

    }

    public dynamic Recall(string name)
    {

      return memory[name];

    }

  }
}
