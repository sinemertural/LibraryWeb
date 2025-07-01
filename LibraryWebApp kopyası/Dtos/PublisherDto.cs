using System.ComponentModel.DataAnnotations;

namespace LibraryWebApp.Dtos
{

    public class PublisherDto
    {
        [Required(ErrorMessage = "Isim Alani Gereklidir")]
        public required string Name { get; set; }
    }
}