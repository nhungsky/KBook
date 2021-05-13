using Abp.Configuration;
using ASPCore.Angular.Configuration.SiteConfig;
using ASPCore.Angular.Models.BaseInfoSetting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BaseInfoSettingController : AngularControllerBase
    {
        private readonly ISettingManager _SettingManager;
        public BaseInfoSettingController(ISettingManager _SettingManager)
        {
            this._SettingManager = _SettingManager;
        }

        [HttpPut]
        public async Task UpdateConfig(BaseInfoSettingModel input)
        {
            await _SettingManager.ChangeSettingForApplicationAsync(input.Name, input.Value);
        }

        [HttpGet]
        public async Task<List<BaseInfoSettingModel>> GetAllSettingKeys()
        {
            return new List<BaseInfoSettingModel>
            {
                new BaseInfoSettingModel {
                    Name = BaseInfoSettingProvider.SITE_NAME,
                    Value= await _SettingManager.GetSettingValueAsync(BaseInfoSettingProvider.SITE_NAME)
                },
                new BaseInfoSettingModel {
                    Name = BaseInfoSettingProvider.LOGO_PATH,
                    Value= await _SettingManager.GetSettingValueAsync(BaseInfoSettingProvider.LOGO_PATH)
                },
                new BaseInfoSettingModel {
                    Name = BaseInfoSettingProvider.FAVICON_PATH,
                    Value= await _SettingManager.GetSettingValueAsync(BaseInfoSettingProvider.FAVICON_PATH)
                },
                new BaseInfoSettingModel {
                    Name = BaseInfoSettingProvider.AUTHOR_NAME,
                    Value= await _SettingManager.GetSettingValueAsync(BaseInfoSettingProvider.AUTHOR_NAME)
                },
                new BaseInfoSettingModel {
                    Name = BaseInfoSettingProvider.IMAGE_HOLDER,
                    Value= await _SettingManager.GetSettingValueAsync(BaseInfoSettingProvider.IMAGE_HOLDER)
                },
                new BaseInfoSettingModel {
                    Name = BaseInfoSettingProvider.SITE_DESCRIPTION,
                    Value= await _SettingManager.GetSettingValueAsync(BaseInfoSettingProvider.SITE_DESCRIPTION)
                },
                new BaseInfoSettingModel {
                    Name = BaseInfoSettingProvider.AUTHOR_LINK,
                    Value= await _SettingManager.GetSettingValueAsync(BaseInfoSettingProvider.AUTHOR_LINK)
                }
            };
        }
    }
}
