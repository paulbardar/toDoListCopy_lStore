;(function() {
	"use strict";
	document.addEventListener('DOMContentLoaded', init);

	function init() {
		// Add item to list
		var addForm = document.querySelector('.ba-add-form');

		addForm.addEventListener('submit', addItem);

	}

	// Add item to incompleted-list
	function addItem(event) {
		event.preventDefault();

		// Creat task li element from template
		var taskLiTmpl = document.getElementById('task-li').innerHTML,
			newTaskInput = document.getElementById('new-task'),
			newTask = newTaskInput.value,
			totalList = document.getElementById('total-list'),
			theDate = document.querySelector('.ba-task-date'),
			timeNow;

		console.log(newTask);

		timeNow = formatDate(new Date());

		function formatDate(date) {

			var day = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
			var hour = date.getHours();
			var minutes = date.getMinutes();

			return day +'.' + monthIndex + 1 + '.' + year + ' ' + hour + ':' + minutes;
		}

		//Insert task value from the form
		totalList.innerHTML += taskLiTmpl
			.replace(/{{task}}/ig, newTask)
			.replace(/{{time}}/ig, timeNow);

		// var now = "new Date()";

		// theDate.innerHTML = now;

		//Clear and focus new task field
		newTaskInput.value = '';
		newTaskInput.focus();
	}

	var listBlock = document.querySelector('.ba-todo-list');

	listBlock.addEventListener('change', movetask);

	listBlock.addEventListener('click', editTask);

	listBlock.addEventListener('keydown', saveTask);


	function saveTask(event){
		var element = event.target,
			dataType = element.dataset.type;
		// If task input and Enter pressed save change task
		if(dataType == 'task' && event.code == "Enter"){
			// console.log(element);
			element.readOnly = true;
		}
	}

	function editTask(event){
		// event.preventDefault();
		var element = event.target,
			action = element.dataset.action;
		if(action === undefined) return;
		event.preventDefault();

		var taskLi = element.parentElement;
		switch (action){
			case 'edit':
				var taskInput = taskLi.querySelector('[type="text"]');
				// console.log(taskInput.readOnly);
				taskInput.readOnly = !taskInput.readOnly;
				if(!taskInput.readOnly){
					taskInput.focus();
				}

			break;
			case 'delete':
				taskLi.remove();
				break;

		}

	}

	function movetask(event){
		var element = event.target;

		if(element.type == 'checkbox') {
			var currentLabel = element.parentElement,
				currentTaskLi = currentLabel.parentElement;

			if(element.checked) {

				currentTaskLi.classList.toggle('ba-task__checked');
			} else {
				currentTaskLi.classList.toggle('ba-task__checked');
			}

			console.log(event.target.type);

		}
	}

	// const allLi = document.querySelectorAll('.ba-tasks-item');
	// allLi.forEach(li=>{
	// 	li.addEventListener('click', (event)=>{

	// 		const input = li.querySelector('.ba-text-field');
	// 		if(event.target.type === 'checkbox'){
	// 			input.classList.toggle('ba-task__checked');
	// 		}
	// 	})
	// })







})();

