using System.Text.Json.Serialization;

namespace LibraryWebApp.Models
{

    public class Publisher
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        //publisher ile books arasında birden çoka ilişki var dedim ve publisher da booksları listeledim.

        [JsonIgnore]

        public virtual List<Book> Books { get; set; } = [];


    }
}