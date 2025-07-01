using System.Text.Json.Serialization;

namespace LibraryWebApp.Models
{

    public class Author
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string Surname { get; set; }

        //author ile book arasında birden çoka ilişki var dedim ve authorda book ları listeledim.

        [JsonIgnore]

        public virtual List<Book> Books { get; set; } = [];

    }
}