using Restaurant.Data.Access.Data;
using Restaurant.Data.Access.Repository.IRepository;
using Restaurant.Models;

namespace Restaurant.Data.Access.Repository
{
   public class ApplicationUserRepository:Repository<ApplicationUser>,IApplicationUserRepository
    {

        private readonly RestaurantDbContext _db;

        public ApplicationUserRepository(RestaurantDbContext db):base(db) 
        {
            _db = db;
        }

     
    }
}
