using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryWebApp.Dtos;
using LibraryWebApp.Models;
using LibraryWebApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PublishersController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PublishersController : ControllerBase
    {
        private AppDbContext dbContext;
        public PublishersController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult getAllPublishers()
        {
            var publishers = dbContext.Publishers.ToList();
            return Ok(publishers);
        }


        [HttpGet]
        [Route("{PublisherId:int}")]
        public IActionResult getPublisherById(int PublisherId)
        {
            var PublisherObj = dbContext.Publishers.Find(PublisherId);
            if (PublisherObj is null)
                return NotFound();
            return Ok(PublisherObj);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult createPublisher(PublisherDto dto)
        {
            var PublisherObj = new Publisher()
            {
                Name = dto.Name,
            };

            dbContext.Publishers.Add(PublisherObj);

            dbContext.SaveChanges();

            return Ok(PublisherObj);
        }


        [HttpPut]
        [Route("{PublisherId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updatePublisher(int PublisherId, PublisherDto dto)
        {
            var PublisherObj = dbContext.Publishers.Find(PublisherId);
            if (PublisherObj is null)
                return NotFound();

            PublisherObj.Name = dto.Name;

            dbContext.SaveChanges();

            return Ok(PublisherObj);
        }


        [HttpDelete]
        [Route("{PublisherId:int}")]
        [Authorize(Roles = "Admin")]
        public IActionResult updatePublisher(int PublisherId)
        {
            var PublisherObj = dbContext.Publishers.Find(PublisherId);
            if (PublisherObj is null)
                return NotFound();

            dbContext.Publishers.Remove(PublisherObj);

            dbContext.SaveChanges();

            return Ok(PublisherObj);
        }

    }
}