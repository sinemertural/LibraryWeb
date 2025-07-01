namespace LibraryWebApp.Models
{

    public class Book
    {

        public int Id { get; set; }

        public required string Name { get; set; }

        public int Count { get; set; } = 0;

        //public int BookTypeId { get; set; }

        public int PublisherId { get; set; }

        public int AuthorId { get; set; }

        // author ile book arasında birden çoka ilişki olmalı 

        public required virtual Author Author { get; set; }

        // publisher ile book arasında birden çoka ilişki olmalı 

        public required virtual Publisher Publisher { get; set; }

        //booktype ile books arasında çoktan çoka ilişki vardır dedim ve aşağıda listeledim.

        public virtual List<BookType> BookTypes { get; set; } = [];


    }
}