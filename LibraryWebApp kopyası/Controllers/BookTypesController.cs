using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryWebApp.Dtos;
using LibraryWebApp.Models;
using LibraryWebApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookTypesController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookTypesController : ControllerBase
    {
        private AppDbContext dbContext;
        public BookTypesController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getAllBookTypes()
        {
            var BookTypes = dbContext.BookTypes.ToList();
            return Ok(BookTypes);
        }


        [HttpGet]
        [Route("{BookTypeId:int}")]
        public IActionResult getBookTypeById(int BookTypeId)
        {
            var BookTypeObj = dbContext.BookTypes.Find(BookTypeId);
            if (BookTypeObj is null)
                return NotFound();
            return Ok(BookTypeObj);
        }


        [HttpPost]
        public IActionResult createBookType(BookTypeDto dto)
        {
            var BookTypeObj = new BookType()
            {
                Name = dto.Name,
            };

            dbContext.BookTypes.Add(BookTypeObj);

            dbContext.SaveChanges();

            return Ok(BookTypeObj);
        }


        [HttpPut]
        [Route("{BookTypeId:int}")]
        public IActionResult updateBookType(int BookTypeId, BookTypeDto dto)
        {
            var BookTypeObj = dbContext.BookTypes.Find(BookTypeId);
            if (BookTypeObj is null)
                return NotFound();

            BookTypeObj.Name = dto.Name;

            dbContext.SaveChanges();

            return Ok(BookTypeObj);
        }


        [HttpDelete]
        [Route("{BookTypeId:int}")]
        public IActionResult updateBookType(int BookTypeId)
        {
            var BookTypeObj = dbContext.BookTypes.Find(BookTypeId);
            if (BookTypeObj is null)
                return NotFound();

            dbContext.BookTypes.Remove(BookTypeObj);

            dbContext.SaveChanges();

            return Ok(BookTypeObj);
        }

    }
}