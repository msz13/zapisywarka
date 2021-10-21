
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Moq;

public class HttpContextMock 
{
    Mock<HttpContext> _httpContextMock;

    HttpContext Instance => _httpContextMock.Object;

    public HttpContextMock() 
    {
        _httpContextMock = new Mock<HttpContext>();
        _httpContextMock.Setup(context => context.SignInAsync(It.IsAny<ClaimsPrincipal>()));
    }

}