using NUnit.Framework;
using System.Threading.Tasks;
using Zapisywarka.API.Modules.Identity.Core.Features;
using FluentAssertions;
using System;

namespace Zapisywarka.Api.Modules.Identity.IntegrationTests
{
    using static Testing;

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
                AccessToken = "abcdefgh",
                UserName = Guid.NewGuid().ToString(),
                Password = "Password"
            };

            var result = await SendAsync(command);

            result.Succeeded.Should().BeTrue();

            var user = await FindUser(command.UserName);
            user.UserName.Should().Be(command.UserName);
            


        }
    }
}