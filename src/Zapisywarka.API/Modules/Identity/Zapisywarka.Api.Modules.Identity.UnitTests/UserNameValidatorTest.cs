using Zapisywarka.API.Modules.Identity.Core;
using NUnit.Framework;
using System.Threading.Tasks;
using Moq;
using Microsoft.AspNetCore.Identity;
using FluentAssertions;
using System;

namespace Zapisywarka.API.Modules.Identity.UnitTests
{
    public class UserValidatorTest 
    {
        AppUserValidator.UserNameValidator _validator;
        

        [SetUp]
        public void Setup()
        {
            _validator = new AppUserValidator.UserNameValidator();
            
        }

        [TestCase("Jan")]
        [TestCase("Jan1")]
        public void ShouldReturnSuccessWhenUserNameMinLenghtIsValid(string userName) 
        {
            var result = _validator.Validate(userName);
             result.IsSuccess.Should().Be(true);
        }

        
        [TestCase("Ja")]
        [TestCase("j")]
        public void ShouldReturnFailureWhenUserNameMinLenghtIsInValid(string userName) 
        {
            
            var result = _validator.Validate(userName);
            result.IsFailure.Should().Be(true);
        }

        [TestCase("ja_123456789_123456789_123456789")]
        [TestCase("j_123456789_123456789_123456789")]
        public void ShouldReturnSuccessWhenUserNameMaxLenghtIsInValid(string userName) 
        {
            
            var result = _validator.Validate(userName);
            result.IsSuccess.Should().Be(true);
        }


        [TestCase("jan_123456789_123456789_123456789")]
        [TestCase("jan1_123456789_123456789_123456789")]
        public void ShouldReturnFailuresWhenUserNameMaxLenghtIsInValid(string userName) 
        {
            var result = _validator.Validate(userName);
            result.IsFailure.Should().Be(true);
        }

        [Test]
        public void ShouldReturnSuccessWhenUserNameHaveAllowedCharacters() 
        {
            var userName = "Jan_sz-kowal.01";
            var result = _validator.Validate(userName);
            result.IsSuccess.Should().Be(true);
        }

        [TestCase("jan/?#[]@!")]
        [TestCase("jan 1")]
        [TestCase("Bożena")]
        [TestCase("jan😀")]
        [TestCase("_jan")]
        [TestCase("jan.")]
        [TestCase("jan.-sz")]
        [TestCase("jan_-sz")]
        public void ShouldReturnFailureWhenUserNameHaveNotAllowedCharacters(string userName)         {
          
            var result = _validator.Validate(userName);
            result.IsFailure.Should().Be(true);
        }

        [Test]
        public void ShouldReturnFailureWhenUserNameIsEmpty()         {
            var userName = "";
            var result = _validator.Validate(userName);
            result.IsFailure.Should().Be(true);
        }

        [Test]
        public void ShouldThrowWhenUserNameIsNull()        
        {           
            FluentActions.Invoking(() => _validator.Validate(null)).Should().Throw<NullReferenceException>();       
        }


    }
    
}