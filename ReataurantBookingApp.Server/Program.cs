using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Restaurant.Data.Access.Data;
using Restaurant.Data.Access.DbInisializer;
using Restaurant.Data.Access.Repository;
using Restaurant.Data.Access.Repository.IRepository;


using ServiceRegisterExtension;
using System.Security.Claims;

namespace RetaurantBooking
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("RestDb");
            builder.Services.AddDbContext<RestaurantDbContext>(options =>
                options.UseSqlServer(connectionString));

            // Add ASP.NET Identity services
            builder.Services.AddIdentity<IdentityUser, IdentityRole>() // Use your custom ApplicationUser class here
                .AddEntityFrameworkStores<RestaurantDbContext>()
                .AddApiEndpoints();

            builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
            builder.Services.AddAuthorizationBuilder();
            builder.Services.AddControllers();


            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IServicesRegisterExtension, ServiceRegisterExtension.ServiceRegisterExtension>();
            builder.Services.AddScoped<IDbInitilizer, DbInitializer>();
            var serviceProvider = builder.Services.BuildServiceProvider();
            var serviceRegisterExtension = serviceProvider.GetRequiredService<IServicesRegisterExtension>();
            serviceRegisterExtension.RegisterServices(builder.Services);
            var configeration = serviceProvider.GetRequiredService<IConfiguration>();



            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", policy =>
                {
                    policy.WithOrigins("https://localhost:5173") 
                          .AllowAnyMethod() 
                          .AllowAnyHeader(); 
                });
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowSpecificOrigin");
            app.MapIdentityApi<IdentityUser>();
            app.UseAuthentication(); // Make sure authentication middleware is added
            app.UseAuthorization();
            SeedDatabase();
            app.MapControllers();


            app.MapGet("/test", (ClaimsPrincipal user) => $"hello{user.Identity!.Name}").RequireAuthorization();
            app.Run();

            void SeedDatabase()
            {
                using (var scope = app.Services.CreateScope())
                {
                    var dbInitializer = scope.ServiceProvider.GetRequiredService<IDbInitilizer>();

                    dbInitializer.Initialize();
                }
            }
        }
    }
}
