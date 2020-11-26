
// usings (specifies class : Controller to important functionality from Microsoft)
using Microsoft.AspNetCore.Mvc;
using calendar.Models; // FromBody
using System.Collections.Generic; // for lists
using System.Linq;

namespace calendar.Controllers
{

    public class ApiController : Controller
    {

        private DataContext dbContext;

        public ApiController(DataContext db)
        {
            this.dbContext = db;
        }

        [HttpPost]
        public IActionResult SaveTask([FromBody] Task theTask)
        {
            // save it
            dbContext.Tasks.Add(theTask);
            dbContext.SaveChanges();

            // return
            return Json(theTask);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var allTasks = dbContext.Tasks.ToList();
            return Json(allTasks);
        }

        [HttpDelete]
        public IActionResult DeleteTask(int id)
        {
            Task theTask = dbContext.Tasks.Find(id); // find the task w/this id
            dbContext.Tasks.Remove(theTask);
            dbContext.SaveChanges();

            return Ok(); // should ALWAYS return something (ok, error, JSON, otherwise AI will keep waiting for return)
        }

        public IActionResult Test()
        {
            return Content("Hello FSDI!");
        }


    }


}

// SQL
// "insert into Task(id, title, location, important) VALUE(" + obj.id + ", "+ obj.title +", " +obj.location + ", " +obj.important + ");" 

// exc
//close connection



// Sql way to save obj- Task.save(obj); 

// select * from Task (will get a list of strings that later need to be manually parsed into objects)