using System.Collections.Generic;

namespace Boa.Constrictor.Screenplay
{
  public  class Question 
  {
    public static IQuestion<T> Where<T>(string description, IQuestion<T> question)
    {
      return new DynamicQuestion<T>(description, question);
    }

    
  }

  public class DynamicQuestion<T> : IQuestion<T>
  {
    private readonly string _description;
    private readonly IQuestion<T> _question;

    public DynamicQuestion(string description, IQuestion<T> question)
    {
      _description = description;
      _question = question;
    }

    public T RequestAs (IActor actor)
    {
      return actor.AskingFor<T>(_question);
    }

    public override string ToString()
    {
      return _description;
    }
        
  }
}