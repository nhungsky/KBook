using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ASPCore.Angular.EntityFrameworkCore
{
    public static class AngularDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<AngularDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<AngularDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
