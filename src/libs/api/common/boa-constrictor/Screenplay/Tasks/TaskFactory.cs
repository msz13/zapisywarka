

using System.Threading.Tasks;

namespace Boa.Constrictor.Screenplay 
{
    
public class TestTask 
{
    
    public static ITaskAsync WhereAsync(string description, ITaskAsync task) {
        return new DynamicTask(description, task);
    }
}

 class DynamicTask : ITaskAsync
{
    string _description;
    private readonly ITaskAsync _task;

    public DynamicTask(string description, ITaskAsync task)
  {
      _description = description;
      _task = task;
    }

    public async Task PerformAsAsync(IActor actor)
    {
       await actor.AttemptsToAsync(_task);     
    }

    public override string ToString()
    {
      return _description;
    }
  }

}

