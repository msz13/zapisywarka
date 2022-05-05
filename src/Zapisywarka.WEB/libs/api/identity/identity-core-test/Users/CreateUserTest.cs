using System.Threading.Tasks;
using Zapisywarka.API.Modules.Identity.Core.Features;
using Zapisywarka.API.Common.Application;
using System.Collections.Generic;
using NUnit.Framework;
using FluentAssertions;

namespace Zapisywarka.Api.Modules.Identity.IntegrationTests
{
    using static Testing;
    using static Zapisywarka.API.Modules.Identity.Core.Features.GetAllUsers;

    [TestFixture]
    public class Tests
    {
        

        [SetUp]
        public async Task Setup()
        {
           await ResetState();
            
        }

        [Test]
        public async Task ShouldSaveUser()
        {
            var command = new CreateUser.Command
            {
                AccessCode = "abcdefgh",
                UserName = "Jan_01",
                Password = "Password"
            };

            var result = await SendAsync(command);

            result.Succeeded.Should().BeTrue();

            var user = await FindUser(command.UserName);
          user.UserName.Should().Be(command.UserName);  
             
        }

        [Test]        
        public async Task ShouldFailWhenCommandIsInvalid()
        {
             var command = new CreateUser.Command
            {  
                      
            };

            await FluentActions.Awaiting(() => SendAsync(command)).Should().ThrowAsync<ValidationException>();
                        
            var user = await FindUser(command.UserName);
            user.Should().BeNull();       

        }


           [Test]
        public async Task ShouldFailWhenUserNameIsInvalid()
        {
            var command = new CreateUser.Command
            {
                AccessCode = "abcdefgh",
                UserName = "jan$",
                Password = "Password"
            };

            await FluentActions.Awaiting(() => SendAsync(command)).Should().ThrowAsync<ValidationException>().WithMessage("*InvalidUserName");
                        
            var user = await FindUser(command.UserName);
            user.Should().BeNull();       

        }

         [Test]
        public async Task ShouldFailWhenUserWithSameNameAlreadyExists()
        {
            var command = new CreateUser.Command
            {
                AccessCode = "abcdefgh",
                UserName = "jan13",
                Password = "Password"
            };

            
            await SendAsync(command);

            
            await FluentActions.Awaiting(() => SendAsync(command)).Should().ThrowAsync<ValidationException>().WithMessage("*DuplicateUserName");
                        
            var users = await SendAsync<List<UserDTO>>(new GetAllUsers.Query());
            users.Count.Should().Be(1);       

        }

      
    }
}