using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ASPCore.Angular.EntityFrameworkCore;
using ASPCore.Angular.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ASPCore.Angular.Web.Tests
{
    [DependsOn(
        typeof(AngularWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class AngularWebTestModule : AbpModule
    {
        public AngularWebTestModule(AngularEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AngularWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(AngularWebMvcModule).Assembly);
        }
    }
}