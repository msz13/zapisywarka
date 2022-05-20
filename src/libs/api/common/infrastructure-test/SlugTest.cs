using NUnit.Framework;
using FluentAssertions;
using Zapisywarka.API.Common.Infrastructure;


namespace Zapisywarka.API.Common.Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Should_trim_expression()
        {
            var expression = "  oferta ";
            var slug = Slug.Slugify(expression);
            slug.Should().Be("oferta");
        }

        [Test]
        public void Should_replace_spaces()
        {
            var expression = "oferta wielkanocna";
            var slug = Slug.Slugify(expression);
            slug.Should().Be("oferta-wielkanocna");
        }

        [Test]
        public void Should_replace_polish_characters()
        {
            var expression = "ąćęłńóśźż";
            var expected = "acelnoszz";
            var slug = Slug.Slugify(expression);
            slug.Should().Be(expected);
        }

        [Test]
        public void Should_remove_non_alphanumeric_characters()
        {
            var expression = "oferta#%&😁123";
            var expected = "oferta123";
            var slug = Slug.Slugify(expression);
            slug.Should().Be(expected);
        }

        [Test]
        public void Should_lower_case()
        {
            var expression = "Oferta Promocyjna";
            var expected = "oferta-promocyjna";
            var slug = Slug.Slugify(expression);
            slug.Should().Be(expected);
        }

        [Test]
        public void Should_change_separators()
        {
            var expression = "oferta_promocyjna,z-okazji.świąt;obecnych";
            var expected = "oferta-promocyjna-z-okazji-swiat-obecnych";
            var slug = Slug.Slugify(expression);
            slug.Should().Be(expected);
        }

        [Test]
        public void Should_replace_multiple_separators_with_one()
        {
            var expression = "oferta__promocyjna,,z--okazji..świąt;;;obecnych  nastepnych";
            var expected = "oferta-promocyjna-z-okazji-swiat-obecnych-nastepnych";
            var slug = Slug.Slugify(expression);
            slug.Should().Be(expected);
        }

        [Test]
        public void Should_strip_separators_from_begginning_and_end()
        {
            var expression = ".,,;-_oferta.,,;-_";
            var expected = "oferta";
            var slug = Slug.Slugify(expression);
            slug.Should().Be(expected);
        }
    
    }
}