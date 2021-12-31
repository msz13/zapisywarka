using NUnit.Framework;
using Zapisywarka.Api.Modules.Identity;
using FluentValidation;
using FluentValidation.TestHelper;
using Zapisywarka.API.Modules.Identity.Core.Features;
using FluentAssertions;
using System.Linq;

namespace Zapisywarka.Api.Modules.Identity.UnitTests
{
    public class UserNameValidator
    {
        CreateUser.CommandValidator validator;
        

        [SetUp]
        public void Setup()
        {
            validator = new CreateUser.CommandValidator();
        }

        [Test]
        public void ShouldReturnErrorWhenEmptyUserName()
        {
            var command  = new CreateUser.Command {
                UserName = ""
            };

            var result = validator.TestValidate(command);

            result.ShouldHaveValidationErrorFor(command => command.UserName);

        }

         [Test]
        public void ShouldReturnErrorWhenEmptyPassword()
        {
            var command  = new CreateUser.Command {
                UserName = "John"
            };

            var result = validator.TestValidate(command);

            result.ShouldHaveValidationErrorFor(command => command.Password);
        }

         [Test]
        public void ShouldReturnErrorWhenEmptyAccessCode()
        {
            var command  = new CreateUser.Command {
                UserName = "John",
                Password = "Tajne_01"
            };

            var result = validator.TestValidate(command);

            result.ShouldHaveValidationErrorFor(command => command.AccessCode).WithErrorCode("NotNullValidator");
        }

           [Test]
        public void ShouldReturnManyErrorsWhenManyFieldsAreInvlaid()
        {
            var command  = new CreateUser.Command {
               
            };

            var result = validator.Validate(command);            
            result.Errors.Count.Should().Be(6);
            
        }
    }
    
    
}