using System.IO;
using ASPCore.Angular.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ASPCore.Angular.Web.Host.Controllers
{

    public class ContentsController : AngularControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public ContentsController(IWebHostEnvironment env)
        {
            _env = env;
        }
        [HttpGet("/contents/{imageName}")]
        public IActionResult Download(string imageName)
        {
            string root = _env.ContentRootPath;
            var filePath = Path.Combine(root, "wwwroot", "contents", imageName);
            if (!System.IO.File.Exists(filePath))
                return NotFound();
            var stream = System.IO.File.OpenRead(filePath);
            return File(stream, "application/octet-stream"); // returns a FileStreamResult
        }
    }
}