using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;
using Zapisywarka.API.Common.Infrastructure;
using Zapisywarka.API.Common.TestState;
using Zapisywarka.API.Modules.Identity;
using Zapisywarka.API.Modules.Offers.Api;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;


namespace Zapisywarka.API.Host
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;

        }

        public IConfiguration Configuration { get; }
        IWebHostEnvironment _env;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
          //  services.AddRazorPages();
            services.AddControllersWithViews();
            services.AddCommonInfrastructure();
            services.AddOffersModule();
            services.AddIdentityModule(); 

            if(!_env.IsProduction())
            {
                services.AddTestStateModule();                
                services.AddControllers().AddJsonOptions(options =>{
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                
            }).AddApplicationPart(Assembly.GetAssembly(typeof(TestStateModuleFactory)));
                  
            }

            //comment
            services.AddCors(options =>
            {
                options.AddPolicy("default", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("default");

            app.UseIdenityModule();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();               
                endpoints.MapGet("/", context => context.Response.WriteAsync("Zapisywarka.pl - API"));               
               
            });
        }
    }
}
