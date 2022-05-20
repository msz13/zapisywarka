using System;
using System.Reflection;
using Zapisywarka.API.Modules.Identity.Core;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using CSharpFunctionalExtensions;
using MediatR;
using Zapisywarka.API.Modules.Identity.Core.Features;
using Microsoft.AspNetCore.Routing;

namespace Zapisywarka.API.Modules.Identity
{
  public static class IdentityModuleFactory
  {
    public static void AddIdentityModule(this IServiceCollection services)
    {

      services.AddControllers().AddApplicationPart(Assembly.GetExecutingAssembly()).AddJsonOptions(options =>
      {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

      });
      services.AddIdentityCoreModule();


    }


    public static void UseIdenityModule(this IEndpointRouteBuilder app)
    {
      /*  app.MapPost("/users", (IMediator _mediatr, CreateUser.Command request)=> {
            await _mediator.Send(request);
            return Results.NoContent();
        });
        app.MapGet("/users", ()=> "users");
         app.UseCookiePolicy(new CookiePolicyOptions {
            Secure = Microsoft.AspNetCore.Http.CookieSecurePolicy.None
        }); */

    }
  }
}
