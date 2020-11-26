
namespace calendar.Models
{
    public class Task 
    {
        public int Id {get; set;}
        public string Title {get; set;}
        public bool Important {get; set;}
        public string DueDate {get; set;}
        public string Description {get; set;}
        public string Location {get; set;}
        public string User {get; set;}
        public string CreatedOn {get; set;}
    }
}