using System.ComponentModel.DataAnnotations;

namespace LibraryWebApp.Dtos
{

    public class AuthorDto
    {
        [Required(ErrorMessage = "Isim Alani Gereklidir")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Isim Alani Gereklidir")]
        public required string Surname { get; set; }
    }
}