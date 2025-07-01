using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryWebApp.Dtos;
using LibraryWebApp.Models;
using LibraryWebApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class BooksController : ControllerBase
    {

        private AppDbContext dbContext;

        public BooksController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]

        public IActionResult getAllBooks()
        {
            var books = dbContext.Books.Include(p => p.Author).Include(p => p.Publisher).Include(p => p.BookTypes).ToList();
            return Ok(books);
        }

        [HttpGet]
        [Route("{bookId:int}")]

        public IActionResult getBookById(int bookId)
        {
            var bookObj = dbContext.Books.Include(p => p.Author).Include(p => p.Publisher).FirstOrDefault(p => p.Id == bookId);

            if (bookObj is null)
                return NotFound();
            return Ok(bookObj);
        }

        [HttpPost]

        public IActionResult createBook(BookDto dto)
        {
            var authorObj = dbContext.Authors.Find(dto.AuthorId);
            if (authorObj is null)
                return NotFound();

            var publisherObj = dbContext.Publishers.Find(dto.PublisherId);
            if (publisherObj is null)
                return NotFound();

            var bookObj = new Book()
            {
                Name = dto.Name,
                Count = dto.Count,
                Author = authorObj,
                Publisher = publisherObj,
                BookTypes = new List<BookType>()
            };


            if (dto.BookTypes != null && dto.BookTypes.Any())
            {
                var bookTypes = dbContext.BookTypes
                    .Where(bt => dto.BookTypes.Contains(bt.Id))
                    .ToList();

                bookObj.BookTypes = bookTypes;
            }

            dbContext.Books.Add(bookObj);

            dbContext.SaveChanges();

            return Ok(bookObj);
        }

        [HttpPut]
        [Route("{bookId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updateBook(int bookId, BookDto dto)
        {
            var authorObj = dbContext.Authors.Find(dto.AuthorId);
            if (authorObj is null)
                return NotFound();

            var publisherObj = dbContext.Publishers.Find(dto.PublisherId);
            if (publisherObj is null)
                return NotFound();

            var bookObj = dbContext.Books.Include(p => p.BookTypes).FirstOrDefault(p => p.Id == bookId);
            if (bookObj is null)
                return NotFound();

            // Kitap bilgilerini güncelle
            bookObj.Name = dto.Name;
            bookObj.Count = dto.Count;
            bookObj.Author = authorObj;
            bookObj.Publisher = publisherObj;

            // BookTypes'ı güncelle
            if (dto.BookTypes != null)
            {
                // Eski ilişkileri kaldır
                bookObj.BookTypes.Clear();

                // Yeni türleri ekle
                var bookTypes = dbContext.BookTypes.Where(bt => dto.BookTypes.Contains(bt.Id)).ToList();
                bookObj.BookTypes = bookTypes;
            }

            dbContext.SaveChanges();

            return Ok(bookObj);
        }

        [HttpDelete]
        [Route("{bookId:int}")]
        [Authorize(Roles = "Admin")]

        public IActionResult updateBook(int bookId)
        {
            var bookObj = dbContext.Books.Find(bookId);
            if (bookObj is null)
                return NotFound();

            dbContext.Books.Remove(bookObj);

            dbContext.SaveChanges();

            return Ok(bookObj);
        }

        [HttpPost]
        [Route("{bookId:int}/BookTypes")]
        [Authorize(Roles = "Admin")]

        public IActionResult AddBookTypes(int bookId, BookBookTypeDto dto)
        {
            var bookObj = dbContext.Books.Include(p => p.BookTypes).FirstOrDefault(p => p.Id == bookId);

            var booktypeObj = dbContext.BookTypes.Find(dto.BookTypeId);

            if (bookObj is null || booktypeObj is null)
                return NotFound();

            bookObj.BookTypes.Add(booktypeObj);

            dbContext.SaveChanges();
            return Ok(bookObj);
        }

        [HttpDelete]
        [Route("{bookId:int}/BookTypes")]

        public IActionResult RemoveBookType(int bookId, BookBookTypeDto dto)
        {
            var bookObj = dbContext.Books.Include(p => p.BookTypes).FirstOrDefault(p => p.Id == bookId);

            var booktypeObj = dbContext.BookTypes.Find(dto.BookTypeId);

            if (bookObj is null || booktypeObj is null)
                return NotFound();

            bookObj.BookTypes.Remove(booktypeObj);

            dbContext.SaveChanges();
            return Ok(bookObj);
        }
    }
}