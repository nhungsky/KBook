using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ASPCore.Angular.Authorization.Roles;
using ASPCore.Angular.Authorization.Users;
using ASPCore.Angular.MultiTenancy;
using ASPCore.Angular.Places;
using ASPCore.Angular.PostCategories;
using ASPCore.Angular.PostComments;
using ASPCore.Angular.PostRatings;
using ASPCore.Angular.Posts;

namespace ASPCore.Angular.EntityFrameworkCore
{
    public class AngularDbContext : AbpZeroDbContext<Tenant, Role, User, AngularDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Place> Places { get; set; }
        public DbSet<PostCategory> PostCategories { get; set; }
        public DbSet<PostComment> PostComments { get; set; }
        public DbSet<PostRating> PostRatings { get; set; }
        public DbSet<Post> Posts { get; set; }

        public AngularDbContext(DbContextOptions<AngularDbContext> options)
            : base(options)
        {

        }
    }
}
