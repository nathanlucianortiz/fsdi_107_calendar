class Task {

    // initialize the properties (get vars [on the right] and assign to objects [this.on the left]
    constructor(title, important, dueDate, description, location){
        this.title = title;
        this.important = important;
        this.dueDate = dueDate;
        this.description = description;
        this.location = location;

        this.user = "Nate";
        this.createdOn = new Date(); // reads and grabs current date & time of comp
    }
}
