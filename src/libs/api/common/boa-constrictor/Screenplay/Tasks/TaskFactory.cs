

using System;
using System.Threading.Tasks;
using Boa.Constrictor.WebDriver;

namespace Boa.Constrictor.Screenplay 
{
    
public class TestTask 
{
    
    public static ITaskAsync WhereAsync(string description, ITaskAsync task) {
        return new DynamicTaskAsync(description, task);
    }

   
    public static ITask Where(string description, ITask task)
    {
      return new DynamicTask(description, task);
    }

    public static ITaskAsync WhereAsync(string description)
    {
      throw new NotImplementedException(description);
    }
  }

 class DynamicTaskAsync : ITaskAsync
{
    string _description;
    private readonly ITaskAsync _task;

    public DynamicTaskAsync(string description, ITaskAsync task)
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

  class DynamicTask : ITask
{
    string _description;
    private readonly ITask _task;

    public DynamicTask(string description, ITask task)
  {
      _description = description;
      _task = task;
    }

    public void PerformAs(IActor actor)
    {
       actor.AttemptsTo(_task);     
    }

    public override string ToString()
    {
      return _description;
    }
  }

}

