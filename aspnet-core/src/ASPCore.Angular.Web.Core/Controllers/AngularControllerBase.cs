using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ASPCore.Angular.Controllers
{
    public abstract class AngularControllerBase: AbpController
    {
        protected AngularControllerBase()
        {
            LocalizationSourceName = AngularConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
