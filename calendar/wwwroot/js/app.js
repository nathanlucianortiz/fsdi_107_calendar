var isItImportant = false; // flag
var detailsVisible = true;
var visibleDetails = true;
var server = 'http://fsdi.azurewebsites.net/api';

function toggleImportant() {
    if (isItImportant) {
        $("#iconImp").addClass('far').removeClass('fas');
        isItImportant = false;
    }
    else {
        $("#iconImp").addClass('fas').removeClass('far');
        isItImportant = true;
    }
}

function toggleDetails() {
    if (detailsVisible) {
        $("#secForm").hide();
        $("#iconSlash").hide();
        $("#iconEye").show();
        detailsVisible = false;
    }
    else {
        $("#secForm").show();
        $("#iconSlash").show();
        $("#iconEye").hide();
        detailsVisible = true;
    }
}

function createTask() {
    // get values from inputs
    var title = $("#txtTitle").val();
    var dueDate = $("#txtDate").val();
    var desc = $("#txtDescription").val();
    var location = $("#txtLocation").val();

    // apply validations (stops the process from continuing if rules not met) validate title:
    if (title.length < 5) {
        // show the alert panel 
        $("#alertError").show();
        // start a timer to hide it, this is 4 seconds; 1 second = 1000
        // Arrow function
        setTimeout(() => $("#alertError").hide(), 5000);

        return;
    }

    //Validate the date for comp report
    if (dueDate.length < 1){
        $("#alertError2").show();

        setTimeout(() => $("#alertError2").hide(), 5000);

        return;
    }

    // create an object
    var task = new Task(title, isItImportant, dueDate, desc, location);

    // send object to server
    $.ajax({
        type: 'POST',
        url: '/api/saveTask', // urls not case sensitive
        data: JSON.stringify(task), // always fixed, required
        contentType: 'application/json', // always fixed, required
        success: function (res) {
            console.log("Server says:", res);
            //display task
            displayTask(res);
            // clear the form
            clear();
        },
        error: function (details) {
            console.log("Error:", details);
        }
    });
}

function displayTask(task) {
    var cssClass = '';
    if (task.important) cssClass = 'fas';
    else cssClass = 'far';

    // parse the date string into a date object
    var date = new Date(task.dueDate);

    var syntax =
        `<div id='task${task.id}' class='task'>
        <i class="${cssClass} fa-star task-star task-section"></i>
        <div class='task-desc'>
            <h5>${task.title}</h5>
            <label>${task.description}</label>
        </div>
        <label class='task-section'>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</label>
        <label class='task-section'>${task.location}</label>

        <div class= 'task-section'>
            <i class= "fas fa-trash" onclick='deleteTask(${task.id})'></i>
         </div>

    </div>`;


    $("#pendingTasks").append(syntax);
}

function deleteTask(id){
    console.log('Deleting', id);

    $.ajax({
        type: 'DELETE',
        url: '/api/deleteTask/' + id,
        success: function (res) {
            console.log("Deleted");

            $("#task" + id).remove(); // $("#task12").remove();
        },
        error: function(details){
            console.log("Error", details);
        }
    });
}

function clear() {
    $("#txtTitle").val('');
    $("#txtDate").val('');
    $("#txtDescription").val('');
    $("#txtLocation").val('');
    if (isItImportant) {
        // change the value
        toggleImportant();
    }
}

function fetchTasksFromServer() {
    $.ajax({
        type: 'GET',
        url: '/api/getTasks',
        success: function (res) {
            console.log("Data from server", res);

            for (let i = 0; i < res.length; i++) {
                let task = res[i];
                if (task.user === "Nate"){
                    displayTask(task);
                }
            }
        },
            error: function(details) {
                console.log("Error getting data", details);
            }
    });

}

function init() {
    console.log("My calendar");

    toggleDetails();

    // load data
    fetchTasksFromServer();

    //hook events
    $("#iconImp").click(toggleImportant);
    $("#btnShowDetails").click(toggleDetails);
    $("#btnSave").click(createTask);
    $("#alertError").hide();
    $("#alertError2").hide();
}


function testGET() {

    $.ajax({
        type: 'GET',
        url: '/api/test', // don't hardcode domain name
        success: function (res) {
            console.log("Succeed", res);
        },
        error: function (details) {
            console.log("Error:", details);
        }
    });
}

window.onload = init;

/*
*
* HTTP Requests
* http methods
* http status codes
*/