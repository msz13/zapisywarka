using Boa.Constrictor.Logging;

namespace Boa.Constrictor.Screenplay
{
    public class Cast 
    {
        ILogger _logger;
        IAbility[] _abilities;

    public Cast(ILogger logger, IAbility[] abilities)
    {
      _logger = logger;
      _abilities = abilities;
    }

    public IActor actorNamed(string name) 
        {
            var actor = new Actor(name, logger: _logger);

            foreach (IAbility ability in _abilities)
            {
                actor.Can(ability);
            }

            return actor;
        }
    }
}