using System.Threading.Tasks;
using ASPCore.Angular.Models.TokenAuth;
using ASPCore.Angular.Web.Controllers;
using Shouldly;
using Xunit;

namespace ASPCore.Angular.Web.Tests.Controllers
{
    public class HomeController_Tests: AngularWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}