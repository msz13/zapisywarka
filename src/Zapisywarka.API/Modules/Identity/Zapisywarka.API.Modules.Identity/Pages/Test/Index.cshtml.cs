using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using System;

namespace RazorPagesContacts.Pages.Customers
{
    public class CreateModel : PageModel
    {
      

        public CreateModel()
        {
            
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Customer John { get; set; }

        public class Customer {

            public string Name {get; set;}
        }

        public IActionResult OnPost()
        {
            Console.WriteLine("POst");
            
            return RedirectToPage("/Index");
        }
    }
}