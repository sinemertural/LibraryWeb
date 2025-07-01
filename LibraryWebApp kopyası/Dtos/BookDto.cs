using System.ComponentModel.DataAnnotations;

namespace LibraryWebApp.Dtos
{

    public class BookDto
    {
        [Required(ErrorMessage = "Isim Alani Gereklidir")]
        public required string Name { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Count 0dan buyuk olmalidir")]
        public int Count { get; set; }

        //birden çoka olduğu için

        [Required]
        public required int AuthorId { get; set; }

        //birden çoka olduğu için

        [Required]
        public required int PublisherId { get; set; }

        public required List<int> BookTypes { get; set; }




    }
}