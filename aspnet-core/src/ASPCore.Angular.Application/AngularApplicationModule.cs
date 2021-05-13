using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ASPCore.Angular.Authorization;

namespace ASPCore.Angular
{
    [DependsOn(
        typeof(AngularCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class AngularApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<AngularAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(AngularApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
