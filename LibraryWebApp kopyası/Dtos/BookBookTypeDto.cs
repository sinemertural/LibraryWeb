using System.ComponentModel.DataAnnotations;

namespace LibraryWebApp.Dtos
{

    //book ve booktype arasında çoktan çoka ilişki olduğu için bir dto sınıfı daha oluşturdum ve adına BookBookTypeDto verdim

    public class BookBookTypeDto
    {
        [Required(ErrorMessage = "BookType Alani Gereklidir")]
        public required int BookTypeId { get; set; }
    }
}