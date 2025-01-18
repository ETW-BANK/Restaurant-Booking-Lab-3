using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Restaurant.Models;
using Restaurant.Utility;
using RestaurantViewModels;
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
        private readonly ILogger<AccountController> _logger;
        public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger<AccountController> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;

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
            if (userVm.Role == null)
            {
                userVm.Role = StaticData.Role_Customer;
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
            string message;

            try
            {
                ApplicationUser user_ = await _userManager.FindByEmailAsync(login.Email);

                if (user_ != null && !user_.EmailConfirmed)
                {

                    user_.EmailConfirmed = true;
                }

                var result = await _signInManager.PasswordSignInAsync(user_, login.Password, login.RmemberMe, false);

                if (!result.Succeeded)
                {
                    return Unauthorized(new { message = "Check your login credentials and try again" });
                }

                user_.LastLogin = DateTime.Now;
                var updateResult = await _userManager.UpdateAsync(user_);

                var roles = await _userManager.GetRolesAsync(user_);

               
                var response = new
                {
                    message = "Login successful",
                    currentUser = new
                    {
                        id = user_.Id,
                        email = user_.Email,
                        roles = roles 
                    }
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong", error = ex.Message });
            }
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok(new { message = "Logged out successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Logout failed: " + ex.Message });
            }
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

                return Ok(new { Users = adminUsers });
            }
            catch (Exception ex)
            {
                return BadRequest($"Something went wrong: {ex.Message}");
            }
        }




        [HttpGet("home/{email}"),Authorize]
        public async Task<ActionResult> HomePage(string email)
        {
            var UserInfo = await _userManager.FindByEmailAsync(email);
            if (UserInfo == null)
            {
                return NotFound("User not found");
            }
            var Role = await _userManager.GetRolesAsync(UserInfo);
            var userRole = Role.FirstOrDefault();
            var result = new UserVm
            {
                Id = UserInfo.Id,
                StreetAddress = UserInfo.StreetAddress,
                City = UserInfo.City,
                Email = UserInfo.Email,
                Role = userRole,
                Name = UserInfo.Name,
                State = UserInfo.State,
                PostalCode = UserInfo.PostalCode,
                PhoneNumber = UserInfo.PhoneNumber
            };
            return Ok(result);
        }

        [HttpGet("xhtlekd")]
        public async Task<ActionResult> CheckUser()
        {
            string message;
            ApplicationUser currentUser = new();
            try
            {
                var user_ = HttpContext.User;
                var principals = new ClaimsPrincipal(user_);
                var result = _signInManager.IsSignedIn(principals);

                if (result)
                {
                    currentUser = await _signInManager.UserManager.GetUserAsync(principals);
                   
                }
                else
                {
                    message = "Access Denied";
                    return Forbid(message);
                }


            }
            catch (Exception ex)
            {
                return BadRequest("Somthing Went Wrong" + ex.Message);
            }
            var roles = await _signInManager.UserManager.GetRolesAsync(currentUser);
            message = "Logged in Succesfully";
            return Ok(new { currentUser.Id ,roles});
        }

        [HttpGet("UserInfo")]
        public IActionResult GetUserInfo()
        {
            
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            return Ok(new { UserId = userId });
        }
    }
}

