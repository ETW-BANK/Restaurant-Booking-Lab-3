using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;
using Restaurant.Utility;
using RestaurantViewModels;
using System.Linq.Expressions;
using System.Security.Claims;

namespace ReataurantBookingApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
       private readonly SignInManager<ApplicationUser> _signInManager;  
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            this._roleManager = roleManager;

        }
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(UserVm userVm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var applicationUser = new ApplicationUser
            {
                UserName = userVm.Email,
                Email = userVm.Email,
                Name = userVm.Name,
                StreetAddress = userVm.StreetAddress,
                City = userVm.City,
                State = userVm.State,
                PostalCode = userVm.PostalCode,
                PhoneNumber = userVm.PhoneNumber
            };

            var result = await _userManager.CreateAsync(applicationUser, userVm.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if (!string.IsNullOrEmpty(userVm.Role) && await _roleManager.RoleExistsAsync(userVm.Role))
            {
                await _userManager.AddToRoleAsync(applicationUser, userVm.Role);
            }

            return Ok(new { message = "User registered successfully!" });
        }


        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(Login login)
        {
            if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
            {
                return BadRequest("Email and Password are required.");
            }

            try
            {
                
                ApplicationUser _user = await _userManager.FindByEmailAsync(login.Email);
                if (_user == null)
                {
                    return Unauthorized("Invalid login credentials.");
                }

               
              _user.EmailConfirmed= true;   

                
                var result = await _signInManager.PasswordSignInAsync(_user, login.Password, login.RmemberMe, false);
                if (!result.Succeeded)
                {
                    return Unauthorized("Invalid login credentials.");
                }

              
                var updateResult = await _userManager.UpdateAsync(_user);
                if (!updateResult.Succeeded)
                {
                    return StatusCode(500, "Unable to update login timestamp.");
                }

                return Ok(new
                {
                    message = "Logged in successfully",
                    user = new
                    {
                        _user.Name,
                        _user.Email,
                     
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request: " + ex.Message);
            }
        }


        [HttpGet("logout"),Authorize]

        public async Task<ActionResult> Logout()
        {
            string message = "Signd Out Succesfully";

            try
            {
                await _signInManager.SignOutAsync();
            }catch (Exception ex)
            {
                return BadRequest("Somthing Went Wrong Please try Agin" + ex.Message);
            }

         
            return Ok(new { message = message });
        }

        [HttpGet("admin"), Authorize]
        public async Task<ActionResult> AdminPage()
        {
            try
            {
                var users = _userManager.Users.ToList();

               
                var adminUsers = new List<object>();

                foreach (var user in users)
                {
                    if (await _userManager.IsInRoleAsync(user, StaticData.Role_Admin))
                    {
                        
                        var roles = await _userManager.GetRolesAsync(user);

                        adminUsers.Add(new
                        {
                            user.Id,
                            user.Name,
                            user.Email,
                            Roles = roles 
                        });
                    }
                }

                if (adminUsers.Count == 0)
                {
                    return NotFound("No admin users found.");
                }

                return Ok(new { adminUsers });
            }
            catch (Exception ex)
            {
                return BadRequest($"Something went wrong: {ex.Message}");
            }
        }



        [HttpGet("home/{email}"), Authorize]

        public async Task< ActionResult> HomePage(string email)
        {
            ApplicationUser UserInfo = await _userManager.FindByEmailAsync(email);

           if(UserInfo==null)
            {
                return BadRequest("Somthing Went Wrong Please try Agin");
            }
           return Ok(new { UserInfo= UserInfo }); 
        }

        [HttpGet("xhtlekd")]

        public async Task<ActionResult> CheckUser()
        {

            string message = "";
            ApplicationUser CurrentUser = new();
            try
            {
                var _user = HttpContext.User;
                var procincipals = new ClaimsPrincipal(_user);
                var result = _signInManager.IsSignedIn(procincipals);

                if (result)
                {
                    CurrentUser = await _signInManager.UserManager.GetUserAsync(procincipals);
                }
                else
                {
                    return Forbid("Access Denied");
                }
            }catch (Exception ex)
            {
                return BadRequest("Somthing Went Wrong Please try Agin" + ex.Message);
            }

            return Ok(new {message=message,user=CurrentUser.Id});
        }

    }
}
