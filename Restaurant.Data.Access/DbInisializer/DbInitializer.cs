using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Restaurant.Data.Access.Data;
using Restaurant.Models;
using Restaurant.Utility;
using System;

namespace Restaurant.Data.Access.DbInisializer
{
    public class DbInitializer : IDbInitilizer
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly RestaurantDbContext _context;

        public DbInitializer(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, RestaurantDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        public void Initialize()
        {
            // Apply pending migrations
            try
            {
                if (_context.Database.GetPendingMigrations().Any())
                {
                    _context.Database.Migrate();
                }
            }
            catch (Exception ex)
            {
                // Log the exception (use a logging library like Serilog, NLog, or Microsoft.Extensions.Logging)
                Console.WriteLine($"Error applying migrations: {ex.Message}");
                throw; // Optional: Re-throw the exception after logging
            }

            // Seed roles
            if (!_roleManager.RoleExistsAsync(StaticData.Role_Customer).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(StaticData.Role_Customer)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(StaticData.Role_Admin)).GetAwaiter().GetResult();

                // Seed admin user
                var adminUser = new ApplicationUser
                {
                    UserName = "admin@green.com",
                    Email = "admin@green.com",
                    Name = "Tense Girma",
                    StreetAddress = "Ellinsborgsbacken 22",
                    State = "Spånga",
                    PostalCode = "16364",
                    City = "Stockholm",
                    EmailConfirmed = true
                };

                var result = _userManager.CreateAsync(adminUser, "@Admin12345").GetAwaiter().GetResult();
                if (result.Succeeded)
                {
                    _userManager.AddToRoleAsync(adminUser, StaticData.Role_Admin).GetAwaiter().GetResult();
                }
                else
                {
                    Console.WriteLine("Failed to create admin user:");
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($" - {error.Description}");
                    }
                }
            }
        }
    }
}
