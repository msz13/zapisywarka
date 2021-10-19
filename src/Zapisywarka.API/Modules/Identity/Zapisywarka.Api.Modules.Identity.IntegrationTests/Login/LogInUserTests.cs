using System.Threading.Tasks;
using NUnit.Framework;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Zapisywarka.API.Common.Infrastructure.Infrastructure;
using Zapisywarka.API.Modules.Identity.Core.Features;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using CSharpFunctionalExtensions;
using Microsoft.AspNetCore.Authentication;

namespace Zapisywarka.Api.Modules.Identity.IntegrationTests
{
    using static Testing;     

    [TestFixture]
    public class LogInUserFeatureTests
    {
        
        [SetUp]
        public async Task Setup()
        {
           await ResetState();                       
        }

        [Test]
        public async Task ShouldSensUserInfo()
        {
            //Given
            var password = "Password_01";
            var signedUpUser = await CreateUser(password);            

            //When   

            var result = await SendAsync(new LoginUser.Command
            {
                UserAccauntName = signedUpUser.UserName,
                Password = password,
            });

            //Then

            result.IsSuccess.Should().Be(true);
            result.Value.Id.Should().Be(signedUpUser.Id);
            result.Value.UserAccauntName.Should().Be(signedUpUser.UserName);


        }

       
        [Test]
        public async Task ShouldReturnFailureWhenUserDoesNotExist()
        {

            //Given
            var password = "Password_01";
            var signedUpUser = await CreateUser(password);            

            //When   

            var result = await SendAsync(new LoginUser.Command
            {
                UserAccauntName = "NotExist",
                Password = password,
            });

            //Then
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be("Błędny login lub hasło");           
                               
        }

         [Test]
        public async Task ShouldReturnFailureWhenPasswordIsWrong()
        {

            //Given
            var password = "Password_01";
            var signedUpUser = await CreateUser(password);            

            //When   

            var result = await SendAsync(new LoginUser.Command
            {
                UserAccauntName = signedUpUser.UserName,
                Password = "WrongPassword_1",
            });

            //Then
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be("Błędny login lub hasło");
         
                              
        }

         private async Task<IdentityUser> CreateUser(string password)
        {
            var userAccauntName = "Bochnek";
            
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