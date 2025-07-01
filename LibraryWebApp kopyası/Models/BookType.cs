using System.Text.Json.Serialization;

namespace LibraryWebApp.Models
{

    public class BookType
    {

        public int Id { get; set; }

        public required string Name { get; set; }

        //booktype ile books arasında çoktan çoka ilişki vardır dedim ve aşağıda listeledim.

        [JsonIgnore]

        public virtual List<Book> Books { get; set; } = [];


    }
}