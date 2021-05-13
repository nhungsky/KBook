using System;
using System.IO;

namespace ASPCore.Angular.Models.AppFile
{
    public class AppFileModel
    {
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Extension { get; set; }
        public long Length { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime CreationTimeUtc { get; set; }
        public DateTime LastAccessTime { get; set; }
        public DateTime LastAccessTimeUtc { get; set; }
        public DateTime LastWriteTime { get; set; }
        public DateTime LastWriteTimeUtc { get; set; }

        public AppFileModel(FileInfo fi)
        {
            Name = fi.Name;
            Extension = fi.Extension;
            FullName = Path.Combine("contents", fi.Name);
            Length = fi.Length;
            CreationTime = fi.CreationTime;
            CreationTimeUtc = fi.CreationTimeUtc;
            LastAccessTime = fi.LastAccessTime;
            LastAccessTimeUtc = fi.LastAccessTimeUtc;
            LastWriteTime = fi.LastWriteTime;
            LastWriteTimeUtc = fi.LastWriteTimeUtc;
        }
    }
}
