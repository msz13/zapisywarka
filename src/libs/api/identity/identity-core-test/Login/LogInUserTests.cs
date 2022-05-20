using System.Threading.Tasks;
using NUnit.Framework;
using Zapisywarka.API.Modules.Identity.Core.Features;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using System;
using Zapisywarka.API.Common.Application;
using System.Security.Claims;

namespace Zapisywarka.Api.Modules.Identity.IntegrationTests
{
  using static Testing;

  [TestFixture]
  public class LogInUserFeatureTests
  {
    IdentityUser _user;
    string _password = "Password_01";


    [SetUp]
    public async Task Setup()
    {
      await ResetState();
      _user = await CreateUser(_password);
    }

    [Test]
    public async Task ShouldReturnUserInfo()
    {

      //When   

      var result = await SendAsync(new LoginUser.Command
      {
        UserName = _user.UserName,
        Password = _password,
      });

      //Then

      result.IsSuccess.Should().Be(true);
      result.Value.UserInfo.Id.Should().Be(_user.Id);
      result.Value.UserInfo.UserName.Should().Be(_user.UserName);


    }


    [Test]
    public async Task ShouldReturnClaimsPrincipal()
    {

      //When   

      var result = await SendAsync(new LoginUser.Command
      {
        UserName = _user.UserName,
        Password = _password,
      });

      //Then

      result.IsSuccess.Should().Be(true);
      result.Value.ClaimsPrincipal.HasClaim(ClaimTypes.NameIdentifier, _user.Id).Should().Be(true);
      result.Value.ClaimsPrincipal.HasClaim(ClaimTypes.Name, _user.UserName).Should().Be(true);


    }


    [Test]
    public async Task ShouldReturnFailureWhenUserDoesNotExist()
    {

      //When   

      var result = await SendAsync(new LoginUser.Command
      {
        UserName = "NotExist",
        Password = _password,
      });

      //Then
      result.IsFailure.Should().BeTrue();
      result.Error.Message.Should().Be("Błędny login lub hasło");

    }

    [Test]
    public async Task ShouldReturnFailureWhenPasswordIsWrong()
    {

      //When   

      var result = await SendAsync(new LoginUser.Command
      {
        UserName = _user.UserName,
        Password = "WrongPassword_1",
      });

      //Then
      result.IsFailure.Should().BeTrue();
      result.Error.Message.Should().Be("Błędny login lub hasło");


    }

    [Test]
    public async Task ShoulThrowWhenUsernameIsEmpty()
    {

      await FluentActions.Awaiting(() => SendAsync(new LoginUser.Command
      {
        UserName = "",
        Password = _password,
      })).Should().ThrowAsync<ValidationException>("Test");

    }

    [Test]
    public async Task ShoulThrowWhenPasswordIsEmpty()
    {

      await FluentActions.Awaiting(() => SendAsync(new LoginUser.Command
      {
        UserName = _user.UserName,
        Password = ""
      })).Should().ThrowAsync<ValidationException>("Test");

    }


    private async Task<IdentityUser> CreateUser(string password)
    {
      var userAccauntName = "Bochenek" + Guid.NewGuid().ToString().Substring(20);

      var user = await SendAsync(new CreateUser.Command
      {
        AccessCode = "test",
        UserName = userAccauntName,
        Password = password
      });

      return await FindUser(userAccauntName);
    }

  }
}
