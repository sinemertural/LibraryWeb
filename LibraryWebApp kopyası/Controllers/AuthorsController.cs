using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryWebApp.Dtos;
using LibraryWebApp.Models;
using LibraryWebApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthorsController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AuthorsController : ControllerBase
    {
        private AppDbContext dbContext;
        public AuthorsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getAllAuthors()
        {
            var authors = dbContext.Authors.ToList();
            return Ok(authors);
        }


        [HttpGet]
        [Route("{AuthorId:int}")]
        public IActionResult getAuthorById(int AuthorId)
        {
            var AuthorObj = dbContext.Authors.Find(AuthorId);
            if (AuthorObj is null)
                return NotFound();
            return Ok(AuthorObj);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult createAuthor(AuthorDto dto)
        {
            var AuthorObj = new Author()
            {
                Name = dto.Name,
                Surname = dto.Surname,
            };

            dbContext.Authors.Add(AuthorObj);

            dbContext.SaveChanges();

            return Ok(AuthorObj);
        }


        [HttpPut]
        [Route("{AuthorId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updateAuthor(int AuthorId, AuthorDto dto)
        {
            var AuthorObj = dbContext.Authors.Find(AuthorId);
            if (AuthorObj is null)
                return NotFound();

            AuthorObj.Name = dto.Name;
            AuthorObj.Surname = dto.Surname;

            dbContext.SaveChanges();

            return Ok(AuthorObj);
        }


        [HttpDelete]
        [Route("{AuthorId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updateAuthor(int AuthorId)
        {
            var AuthorObj = dbContext.Authors.Find(AuthorId);
            if (AuthorObj is null)
                return NotFound();

            dbContext.Authors.Remove(AuthorObj);

            dbContext.SaveChanges();

            return Ok(AuthorObj);
        }

    }
}