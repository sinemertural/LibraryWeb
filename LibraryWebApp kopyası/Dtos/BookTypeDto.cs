using System.ComponentModel.DataAnnotations;

namespace LibraryWebApp.Dtos
{

    public class BookTypeDto
    {
        [Required(ErrorMessage = "Isim Alani Gereklidir")]
        public required string Name { get; set; }
    }
}