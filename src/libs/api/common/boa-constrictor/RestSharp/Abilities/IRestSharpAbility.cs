using Boa.Constrictor.Dumping;
using Boa.Constrictor.Screenplay;
using RestSharp;
using System.Net;

namespace Boa.Constrictor.RestSharp
{
    /// <summary>
    /// Enables the Actor to make REST API calls using RestSharp.
    /// It holds one RestSharp client for the given base URL.
    /// This Ability also holds dumpers for requests/responses and downloaded files.
    /// If dumpers are null, then no dumping is performed.
    /// This Ability also handles adding and retrieving cookies.
    /// 
    /// To use more than one RestSharp client, create classes that implement this interface.
    /// Then, the Actor can use that class as a new type of Ability for lookup.
    /// </summary>
    public interface IRestSharpAbility : IAbility
    {
        #region Properties

        /// <summary>
        /// The RestSharp client.
        /// </summary>
        RestClient Client { get; }

       
        /// <summary>
        /// The last response object dumped.
        /// Warning: it might be null.
        /// </summary>
        RestResponse LastResponse { get; }

        #endregion

        #region Methods

       

        #endregion
    }
}