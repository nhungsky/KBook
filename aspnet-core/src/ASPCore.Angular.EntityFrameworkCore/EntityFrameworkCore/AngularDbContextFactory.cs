using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using ASPCore.Angular.Configuration;
using ASPCore.Angular.Web;

namespace ASPCore.Angular.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class AngularDbContextFactory : IDesignTimeDbContextFactory<AngularDbContext>
    {
        public AngularDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<AngularDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            AngularDbContextConfigurer.Configure(builder, configuration.GetConnectionString(AngularConsts.ConnectionStringName));

            return new AngularDbContext(builder.Options);
        }
    }
}
