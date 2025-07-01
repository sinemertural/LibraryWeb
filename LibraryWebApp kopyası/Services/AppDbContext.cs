using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryWebApp.Models;

namespace LibraryWebApp.Services
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public required DbSet<Book> Books { get; set; }
        public required DbSet<Author> Authors { get; set; }
        public required DbSet<BookType> BookTypes { get; set; }
        public required DbSet<Publisher> Publishers { get; set; }

        public required DbSet<User> Users { get; set; }



    }
}