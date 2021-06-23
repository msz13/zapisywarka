using NUnit.Framework;
using System.Threading.Tasks;
using Zapisywarka.API.Modules.Identity.Core.Features;
using FluentAssertions;
using System;
using Common.Application;

namespace Zapisywarka.Api.Modules.Identity.IntegrationTests
{
    using static Testing;

    [TestFixture]
    public class Tests
    {
        

        [SetUp]
        public async Task Setup()
        {
           // await ResetState();
            
        }

        [Test]
        public async Task ShouldSaveUser()
        {
            var command = new CreateUser.Command
            {
                AccessToken = "abcdefgh",
                UserName = Guid.NewGuid().ToString(),
                Password = "Password"
            };

            var result = await SendAsync(command);

            result.Succeeded.Should().BeTrue();

            var user = await FindUser(command.UserName);
          user.UserName.Should().Be(command.UserName);  
             


        }

        [Test]
        public async Task ShouldFailWhenPasswordIsNull()
        {
             var command = new CreateUser.Command
            {  
                UserName = Guid.NewGuid().ToString()           
            };

            await FluentActions.Awaiting(() => SendAsync(command)).Should().ThrowAsync<ArgumentNullException>();
            
            var user = await FindUser(command.UserName);
            user.Should().BeNull();        

        }

        [Test]
         public async Task ShouldFailWhenUserNameIsNull()
        {
             var command = new CreateUser.Command
            {           
                Password = "Password"  
            };

         FluentActions.Awaiting(() => SendAsync(command))
                .Should()
                .ThrowAsync<ValidationException>().Result
                .Where(e => e.Message.Contains("Pole 'User Name' nie może być puste"));  

         var user = await FindUser(command.UserName);
         user.Should().BeNull();     

              

        }
        
    }
}