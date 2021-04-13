using Common.Application;
using Microsoft.EntityFrameworkCore;
using OffersInfrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OffersBD.Common
{
    class OfferUniqueNameValidator
    {
        OffersDbContext _context;

        public OfferUniqueNameValidator(OffersDbContext context)
        {
            _context = context;
        }

        public async Task Validate(string name)
        {
            var nameExists = await _context.Offers.AnyAsync(o => o.Name == name);

            if (nameExists)
            {
                throw new ValidationException(new List<string> { $"Nazwa oferty '{name}' została już wykorzystana" });
            }

        }
    }
}
