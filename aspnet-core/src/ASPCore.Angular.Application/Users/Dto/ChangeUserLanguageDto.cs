using System.ComponentModel.DataAnnotations;

namespace ASPCore.Angular.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}