using Abp.UI;
using ASPCore.Angular.Models.AppFile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPCore.Angular.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AppFileController : AngularControllerBase
    {
        private readonly IHostEnvironment _host;
        private string FileStoreLocation = "";

        public AppFileController(IHostEnvironment _host)
        {
            this._host = _host;
            // Tạo đường dẫn đến thư mục chứa files của hệ thống
            FileStoreLocation = Path.Combine(_host.ContentRootPath, "wwwroot", "contents");
            if (!Directory.Exists(FileStoreLocation))
            {
                // Nếu thư mục này chưa tồn tại, tiến hành tạo mới
                Directory.CreateDirectory(FileStoreLocation);
            }
        }

        [HttpDelete]
        public void Delete(string fileName)
        {
            var filePathForDelete = Path.Combine(FileStoreLocation, fileName);
            if (System.IO.File.Exists(filePathForDelete))
            {
                System.IO.File.Delete(filePathForDelete);
            }
        }

        [HttpGet]
        public List<AppFileModel> GetAllFile()
        {
            DirectoryInfo d = new DirectoryInfo(FileStoreLocation);
            return d.GetFiles().ToList()
                .Select(x => new AppFileModel(x)).ToList();
        }

        [HttpPut]
        public AppFileModel Rename(string oldName, string newName)
        {
            var filePathForOldName = Path.Combine(FileStoreLocation, oldName);

            var newExt = Path.GetExtension(newName);
            if (newExt == null || newExt.Length <= 2)
            {
                newName += Path.GetExtension(oldName);
            }

            var filePathForNewName = Path.Combine(FileStoreLocation, newName);

            if (System.IO.File.Exists(filePathForNewName))
            {
                throw new UserFriendlyException(400, "TheNewFileNameHasBeenDuplicated", "");
            }

            if (System.IO.File.Exists(filePathForOldName))
            {
                System.IO.File.Move(filePathForOldName, filePathForNewName);
            }
            var fi = new FileInfo(filePathForNewName);
            return new AppFileModel(fi);
        }

        [HttpPost]
        public async Task<AppFileModel> UploadFile(IFormFile file)
        {
            string fileName = Path.GetFileName(file.FileName);
            var destinationPath = Path.Combine(FileStoreLocation, fileName);
            destinationPath = CorrectFileName(destinationPath);
            using (FileStream stream = new FileStream(destinationPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fi = new FileInfo(destinationPath);
            return new AppFileModel(fi);
        }

        [HttpPost]
        public async Task<AppFileModel> UploadImage(IFormFile file)
        {
            string fileName = Path.GetFileName(file.FileName);
            var destinationPath = Path.Combine(FileStoreLocation, "place-images", fileName);
            destinationPath = CorrectFileName(destinationPath);
            using (FileStream stream = new FileStream(destinationPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fi = new FileInfo(destinationPath);
            return new AppFileModel(fi);
        }

        private string CorrectFileName(string fileName)
        {
            // Nếu tệp tin không tồn tại, trả về luôn
            if (!System.IO.File.Exists(fileName))
                return fileName;

            // Nếu không tiến hành tách đuôi
            var parent = Path.GetDirectoryName(fileName);
            var fn = Path.GetFileNameWithoutExtension(fileName);
            var extension = Path.GetExtension(fileName);

            fn = $"{Guid.NewGuid()}_{fn}{extension}";
            return Path.Combine(parent, fn);
        }
    }
}
