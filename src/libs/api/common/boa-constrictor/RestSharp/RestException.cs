namespace Boa.Constrictor.RestSharp
{

    [System.Serializable]
    public class RestExceptionException : System.Exception
    {
        public RestExceptionException() { }
        public RestExceptionException(string message) : base(message) { }
        public RestExceptionException(string message, System.Exception inner) : base(message, inner) { }
        protected RestExceptionException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}