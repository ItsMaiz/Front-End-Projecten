addEventsToInputs();
changeTitleToInput();

function addEventsToInputs() {
    var taskInput = document.getElementsByClassName("toDo__input");
    for (var i = 0; i < taskInput.length; i++) {
        taskInput[i].onkeyup = function (event) {
            newTask(event);
        }
    }
}

function changeTitleToInput() {
    var headers = document.getElementsByClassName("toDo__header");
    for (var i = 0; i < headers.length; i++) {
        headers[i].onclick = function () {
            var oldTitle = this.children[0].innerText;
            this.children[0].remove();
            var newInput = document.createElement("input");
            newInput.classList = "toDo__headerInput";
            newInput.value = oldTitle;
            this.appendChild(newInput);
            newInput.focus();

            newInput.onkeyup = function (event) {
                if (event.key === "Enter") {
                    var newTitle = event.target.value;
                    var newHeading = document.createElement("h2");
                    event.target.parentElement.appendChild(newHeading);
                    newHeading.innerText = newTitle;
                    newHeading.classList = "toDo__heading";
                    this.remove();
                }
            }
        }
    }
}

function newTask(event) {
    if (event.key === "Enter") {
        var tasks = event.target.parentElement.parentElement.children[1].children[0]
        var newTask = document.createElement("li");
        newTask.innerText = event.target.value;
        newTask.classList = "toDo__task";
        newTask.dataset.running = "false";
        tasks.appendChild(newTask);
        event.target.value = "";
        newTask.onclick = function (event) {
            set0rClearTimer(event);
        }
    }
}

var tasks = document.getElementsByClassName("toDo__task");
var timer = null;
for (var i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function (event) {
        set0rClearTimer(event);
    }
}

function toDone(event) {
    timer = setTimeout(function () {
        var doneTask = document.createElement("li");
        doneTask.classList = "toDo__task toDo__task--done";
        doneTask.innerText = event.target.innerText;
        document.getElementById("js--done").appendChild(doneTask);
        event.target.remove();
    }, 3000)
}

function set0rClearTimer(event) {
    if (event.target.dataset.running === "false") {
        event.target.classList.toggle("toDo__task--done");
        event.target.dataset.running = "true";
        toDone(event);
    }
    else if (event.target.dataset.running === "true") {
        event.target.classList.toggle("toDo__task--done");
        clearTimeout(timer);
        event.target.dataset.running = "false";
    }
}

var fab = document.getElementById("js--fab");
fab.onclick = function () {
    makeNewcard();
}

function makeNewcard() {
    var newTodo = document.createElement("article");
    newTodo.classList = "toDo";

    var newHeader = document.createElement("header");
    newHeader.classList = "toDo__header";

    var newHeading = document.createElement("h2");
    newHeading.classList = "toDo__heading";
    newHeading.innerText = "Default";

    var newSection = document.createElement("section");
    newSection.classList = "toDo__body";

    var newList = document.createElement("ul");
    newList.classList = "toDo__tasks";

    var newFooter = document.createElement("footer");
    newFooter.classList = "toDo__footer";

    var newInput = document.createElement("input");
    newInput.classList = "toDo__input";
    newInput.type = "text";
    newInput.placeholder = "Enter a task...";
    newInput.id = "js--input";

    newFooter.appendChild(newInput);
    newSection.appendChild(newList);
    newHeader.appendChild(newHeading);
    newTodo.appendChild(newHeader);
    newTodo.appendChild(newSection);
    newTodo.appendChild(newFooter);

    document.getElementsByTagName("body")[0].appendChild(newTodo);
    addEventsToInputs();
    changeTitleToInput();
}