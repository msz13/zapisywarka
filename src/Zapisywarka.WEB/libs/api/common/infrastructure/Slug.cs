using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Zapisywarka.API.Common.Infrastructure
{
    public class Slug 
    {
        public static string Slugify(string expression)
        {
            var slug = ReplacePolishCharacteres(expression);

            slug = RemoveNonAlphanumericAndSeparators(slug);

            slug = ReplaceSeparators(slug);

            slug = StripSeparatorsFromBegginingAndEnd(slug);            

            return slug;
        }

        private static string RemoveNonAlphanumericAndSeparators(string slug)
        {
            slug = Regex.Replace(slug, "[^a-z0-9-.,;_]", "");
            return slug;
        }

        private static string StripSeparatorsFromBegginingAndEnd(string slug)
        {
            slug = Regex.Replace(slug, "^[-.,;_]+", "");
            slug = Regex.Replace(slug, "[-.,;_]+$", "");
            return slug;
        }

        private static string ReplacePolishCharacteres(string expression)
        {
            var builder = new StringBuilder(expression.Trim().ToLower());
            builder.Replace(" ", "-");

            foreach (KeyValuePair<char, char> kvp in mappedCharacters)
                builder.Replace(kvp.Key, kvp.Value);

            var slug = builder.ToString();
            return slug;
        }

        private static string ReplaceSeparators(string slug)
        {
            slug = Regex.Replace(slug, "[-.,;_ _]+", "-");
            return slug;
        }

        private static Dictionary<char, char> mappedCharacters = new Dictionary<char, char>() 
        {
            {'ą', 'a'},
            {'ć', 'c'},
            {'ę', 'e'},
            {'ł', 'l'},
            {'ń', 'n'},
            {'ó', 'o'},
            {'ś', 's'},
            {'ź', 'z'},
            {'ż', 'z'},
           
        };

    }      

}