// ;(function() {
//     "use strict";




const input = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const totalList = document.getElementById('total-list');
const sortBtn = document.getElementById('sort-btn');


// var btnEditClicked = false;
const storageName = 'todo_list';
let inputToChange;
// let indexToDo;
var storage = {
    lsName: storageName,

    save: function(data) {
        localStorage.setItem(this.lsName, JSON.stringify(data));
    },
    read: function(key) {
        let data = localStorage.getItem(this.lsName);
        return JSON.parse(data);
    },
     update: function (data) {

     }
};

    function formatDate(date) {
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        // return date.toUTCString();
        return day +'.' + monthIndex + 1 + '.' + year + ' ' + hour + ':' + minutes;
    };

    function getInputValue (){
        return input.value;
    }

let toDoTask = {
    date: "",
    prioritet: 1,
    task: "",
    inputCheck: false,
}

let todo_list = storage.read() || [];

    function renderToDos() {
        totalList.innerHTML = "";

        for(let i = 0; i < todo_list.length; i ++){
            let todo = todo_list[i];
            // console.log(todo);
                let toDoTask = JSON.parse(todo);
                let indexToDo = todo_list.indexOf(todo);

                let li = document.createElement('li');
                li.setAttribute("class", "ba-list-item");
                li.setAttribute('id', i);

                let time = document.createElement('time');
                time.setAttribute("class", "ba-task-date");
                time.setAttribute("datetime", toDoTask.date);
                let txtInput = document.createElement('input');
                txtInput.classList.add("ba-text-field");

                li.appendChild(time);

                let priorDiv = document.createElement('div');
                priorDiv.setAttribute("class", "ba-task-prioritet");
                li.appendChild(priorDiv);

                // let btnPriorMin = document.createElement('button');
                // btnPriorMin.setAttribute("type", "button");
                // btnPriorMin.setAttribute("onclick", 'stepDown()');
                //
                // let inputPrior = document.createElement("type")

                priorDiv.innerHTML = "<button type=\"button\" onclick=\"stepPrivDown(" + indexToDo + ")\"></button>\n" +
                    "<p>"+ toDoTask.prioritet +"</p>"+
               // "<input type=\"number\" min=\"0\" max=\"100\" value=\" "+ toDoTask.prioritet +"  \" readonly class=\"ba-task-prioritet__value\">\n" +
                "<button type=\"button\" onclick=\"stepPrivUp(" + indexToDo + ")\"></button>" ;

                li.appendChild(txtInput);

                let item = document.createTextNode(toDoTask.task);
                let date = document.createTextNode(toDoTask.date);

                let btnEdit = document.createElement('button');
                btnEdit.setAttribute('data-action', 'edit');

                btnEdit.setAttribute('onclick', 'editToDo(event, '+ indexToDo + ')');
                btnEdit.setAttribute('title', 'Edit Task');
                // btnEdit.setAttribute('onclick', 'editToDo(event)');
                let btnEditCaption = document.createTextNode('Edit');
                btnEdit.classList.add("ba-edit-button");

                let btnSave = document.createElement('button');
                btnSave.setAttribute('data-action', 'save');
                btnSave.setAttribute('title', 'Save Edited Task');

                // btnSave.setAttribute('onclick', 'saveToDo(event)');
                btnSave.setAttribute('onclick', 'saveToDo(event, ' + indexToDo + ')');
                let btnSaveCaption = document.createTextNode('Save');
                btnSave.classList.add("ba-save-button");

                let labelCheckbox = document.createElement('label');
                labelCheckbox.classList.add('mycheckbox');
                labelCheckbox.setAttribute('title', 'Check task');
                let btnCheckBox = document.createElement('input');
                // btnCheckBox.setAttribute('onchange', 'addCheckClassLi(event, ' + indexToDo + ')');
                btnCheckBox.setAttribute('onchange', 'addCheckClassLi(' + indexToDo + ')');
                btnCheckBox.type = 'checkbox';
                btnCheckBox.checked = toDoTask.inputCheck;
                if(btnCheckBox.checked == true) {
                    li.classList.add('ba-list-item__checked');
                } else {
                    li.classList.remove('ba-list-item__checked');
                }


                let btnDelete = document.createElement('a');
                btnDelete.setAttribute('href', '#');
                btnDelete.setAttribute('title', 'Delete task');
                // btnDelete.setAttribute('onclick', 'removeToDo(' + indexToDo + ')');
                btnDelete.setAttribute('onclick', 'openModal(' + indexToDo + ')');
                let btnDeleteCaption = document.createTextNode('Remove');
                btnDelete.classList.add("ba-remove-button");

                time.appendChild(date);
                txtInput.setAttribute("value", toDoTask.task);
                txtInput.setAttribute("readonly", true);
                txtInput.setAttribute("type", "text");
                txtInput.setAttribute("data-type", "task");

                btnEdit.appendChild(btnEditCaption);
                li.appendChild(btnEdit);
                btnSave.appendChild(btnSaveCaption);
                li.appendChild(btnSave);

                li.appendChild(labelCheckbox);
                labelCheckbox.appendChild(btnCheckBox);


                btnDelete.appendChild(btnDeleteCaption);
                li.appendChild(btnDelete);

            totalList.appendChild(li);
            }

    }



    var listBlock = document.querySelector('.ba-todo-list');

    listBlock.addEventListener('keydown', saveTask);

    function addToDo(toDoTask) {
        todo_list.unshift(toDoTask);
        console.log(todo_list);
        storage.save(todo_list);
        renderToDos();
    }

    // Filter-Search List
    let sortBlock = document.querySelector('.ba-sort');
    sortBlock.addEventListener('keyup', filterTask);

    function filterTask(){
        let inputField, filter, ul, li, inputTaskField, textValue;
        inputField = document.getElementById('filterInput');
        filter = inputField.value.toUpperCase();
        ul = document.getElementById('total-list');
        // li = document.getElementsByTagName('li');
        li = document.querySelectorAll('.ba-list-item');

        // Loop through all list items, and hide those who don't match the search query
        for(let i = 0; i < li.length; i++) {
            // inputTaskField = li[i].getElementsByTagName('input')[0];
            inputTaskField = li[i].querySelector('.ba-text-field');
            textValue = inputTaskField.value;
            if(textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    }



    function addCheckClassLi(index) {

        let taskToChange = JSON.parse(todo_list[index]);
		console.log(taskToChange);
        taskToChange.inputCheck = !taskToChange.inputCheck;
        console.log(taskToChange.inputCheck);
        let taskToChangeString = JSON.stringify(taskToChange);
        todo_list.splice(index, 1, taskToChangeString);
        storage.save(todo_list);


        renderToDos();
    }

    // Modal Remove block
    let btnRemove = document.getElementById('modalDeleteButton');
    let modal = document.getElementById('modalDelete');
    let btnCancel = document.getElementById('modalCancelBtn');
    btnCancel.setAttribute('onclick', 'closeModal()');

    function openModal(index) {
        modal.style.display = 'block';
        console.log(index);
        btnRemove.setAttribute('onclick', 'removeToDo(' + index + ')');
    }

    function closeModal() {
        modal.style.display = 'none';
    }


    // End of Modal Remove block

    function removeToDo(index) {
        todo_list.splice(index, 1);
        modal.style.display = 'none';
        storage.save(todo_list);
        renderToDos();
    }

    function saveTask(event){
        var element = event.target,
            dataType = element.dataset.type;
        inputToChange = element.value;
        let elementLi = element.parentElement;
        let elementIndex = +elementLi.id;
        // If task input and Enter pressed save change task
        if(dataType == 'task' && event.code == "Enter"){
            // console.log(element);
            element.readOnly = true;
        }
    }

    function editToDo(event){

        var element = event.target,
            action = element.dataset.action;
        // btnEditClicked = !btnEditClicked;
        if(action === undefined) return;
        event.preventDefault();

        var taskLi = element.parentElement;
        var taskInput = taskLi.querySelector('[type="text"]');
        taskInput.readOnly = !taskInput.readOnly;
        if(!taskInput.readOnly){
            taskInput.focus();
        }
    }

    function saveToDo(event, index){
        let element = event.target,
            taskLi = element.parentElement,
            taskInput = taskLi.querySelector('[type="text"]'),
            inputToChange = taskInput.value;

        console.log("inputToChange " + inputToChange);
        let taskToChange = JSON.parse(todo_list[index]);
        taskToChange.task = inputToChange;

        console.log(taskToChange.task);
        let taskToChangeString = JSON.stringify(taskToChange);
        todo_list.splice(index, 1, taskToChangeString);
        storage.save(todo_list);
        taskInput.readOnly = !taskInput.readOnly;
        renderToDos();

        // var element = event.target,
        //     action = element.dataset.action,
        //     dataType = element.dataset.type;

        // console.log(element.parentElement);
        // let elementLi = element.parentElement;
        // elementIndex = +elementLi.id;
        // if(action === undefined) return;
        // event.preventDefault();
        // // If task input and Enter pressed save change task
        // if(dataType == 'task'){
        //     // console.log(element);
        //     element.readOnly = true;

            // let elementSaved = elementIndex.target;
            // let taskToChange = JSON.parse(todo_list[elementIndex]);
            // let taskText = taskToChange.task;
            // console.log("taskToChange is " +  taskToChange.task);
            // taskToChange.task = taskText;
            // let taskToChangeString = JSON.stringify(taskToChange);
            // todo_list.splice(elementIndex, 1, taskToChangeString);
            // storage.save(todo_list);
            // renderToDos();
        // }

    }

    function stepPrivDown(index){
        let taskToChange = JSON.parse(todo_list[index]);
        let number = taskToChange.prioritet;
        console.log("taskToChange is " +  taskToChange.prioritet);
        taskToChange.prioritet = number -1;
        let taskToChangeString = JSON.stringify(taskToChange);
        todo_list.splice(index, 1, taskToChangeString);
        storage.save(todo_list);
        renderToDos();
    }

    function stepPrivUp(index){
        let taskToChange = JSON.parse(todo_list[index]);
        let number = taskToChange.prioritet;
        console.log("taskToChange is " +  taskToChange.prioritet);
        taskToChange.prioritet = number +1;
        let taskToChangeString = JSON.stringify(taskToChange);
        todo_list.splice(index, 1, taskToChangeString);
        storage.save(todo_list);
        renderToDos();
    }

    renderToDos(todo_list);
    addBtn.onclick = function() {
        if (input.value != "") {
            toDoTask.task = getInputValue();
            toDoTask.date = formatDate(new Date());
            addToDo(JSON.stringify(toDoTask));
            input.value = "";
        } else {
            alert("Insert a item");
        }
    }

    let sortBtnClicked = false;
    sortBtn.onclick = function() {
        sortBtnClicked = !sortBtnClicked;
        let objArr = [];
        for (let i = 0; i < todo_list.length; i++){
            let todo = todo_list[i];
            let todoTask = JSON.parse(todo);
            objArr.push(todoTask);
        }
        // objArrJs = JSON.stringify(objArr);
        // console.log(objArrJs);


        // let objArrSort = JSON.parse(objArrJs);
        // console.log(objArr);
        function compare( a, b ) {
            if(sortBtnClicked == true) {
                if( a.prioritet < b.prioritet ) {
                    return -1;
                }
                if ( a.prioritet > b.prioritet ) {
                    return 1;
                }
                return 0;

            } else {
                if( a.prioritet > b.prioritet ) {
                    return -1;
                }
                if ( a.prioritet < b.prioritet ) {
                    return 1;
                }
                return 0;
            }

        }
        objArr.sort( compare );
        objArr.forEach(x => console.log(x.prioritet + ": " + x.task));

        let objTodoList = [];
        for( let i = 0; i < objArr.length; i++){
            let todoNew = objArr[i];
            let todoTaskNew = JSON.stringify(todoNew);
            objTodoList.push(todoTaskNew);
        }
        console.log(objTodoList);
        todo_list = objTodoList;
        storage.save(todo_list);
        renderToDos();

    }



// })();



