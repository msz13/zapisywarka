
using System.ComponentModel.DataAnnotations;

namespace Zapisywarka.API.Modules.Identity.Features.Authentication {

public class Authenticate {

    public class Command {           
        
        public string Login {get; set;}

        [DataType(DataType.Password)]
        public string Password {get; set;}
        public string ReturnUrl {get; set;}
    }
}

}
