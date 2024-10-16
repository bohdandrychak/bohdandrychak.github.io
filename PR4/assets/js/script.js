window.onload = function(){
    loadTasks()
}

function sort(sortName){
    tasks = document.querySelectorAll('li');
    if(sortName == 'all'){
        tasks.forEach(task => {
            task.classList.add('active')
        })
    }
    else if(sortName == 'completed'){
        tasks.forEach(task => {
            if(task.classList.contains('completed')){
                task.classList.add('active')
            }
            else{
                task.classList.remove('active')
            }
        })
    }
    else if(sortName == 'notCompleted'){
        tasks.forEach(task => {
            if(!task.classList.contains('completed')){
                task.classList.add('active')
            }
            else{
                task.classList.remove('active')
            }
        })
    }
}

function formatDate() {
    var date = new Date();
    var minutes = date.getMinutes(),
        hours = date.getHours(),
        day = date.getDate(),
        month = date.getMonth()+1,
        year = date.getFullYear();
    minutes = minutes<10 ? '0' + minutes : minutes;
    hours = hours<10 ? '0' + hours : hours;
    day = day<10 ? '0' + day : day;
    month = month<10 ? '0' + month : month;
    year = year.toString().slice(-2);
    return(`${day}.${month}.${year} ${hours}:${minutes}`);
}

function checkboxChange(event){
    let checked = event.target.parentElement;
    if(checked.classList.contains('completed')){
        checked.classList.remove('completed');
    }
    else{
       checked.classList.add('completed') ;
    }
    saveTasks()
}

function saveTextChanges(event){
    if (event.key === 'Enter' || event.type === 'focusout') {
        let textarea = event.target;
        if (textarea.value == ''){
            alert('Enter text')
        }
        else{
            textarea.style.display = 'none';
            span_element = event.target.parentElement;
            span_element.innerText = textarea.value; 
        }
    }
    saveTasks()
}

function editSpan(event){
    let span_element = event.target;
    let span_input = document.createElement('textarea');
    span_input.type = 'text';
    span_input.value = span_element.innerText;
    span_element.innerText = '';
    span_element.appendChild(span_input);
    span_input.focus();
    span_input.addEventListener('keypress', saveTextChanges);
    span_input.addEventListener('focusout', saveTextChanges);
}
function deleteTask(event){
    let task = event.target.parentElement;
    ul.removeChild(task)
    saveTasks()
}

function addTask(event){
    if (event.key === 'Enter') {
        if (task.value == ''){
            alert('Enter text')
        }
        else{
            let taskLi = createTask(task.value, formatDate(), false)
            ul.appendChild(taskLi);
            task.value = '';
            saveTasks();
        } 
      }
}

function createTask(text, date, completed){
    let li = document.createElement('li');
            let input_checkbox = document.createElement('input');
            let span_task = document.createElement('span');
            let span_date = document.createElement('span');
            let button_delete = document.createElement('button');
            li.id = number;
            button_delete.id = number;
            number++;
            input_checkbox.type = 'checkbox';
            input_checkbox.addEventListener('click', checkboxChange);
            button_delete.className = 'delete-btn';
            button_delete.textContent = 'X';
            button_delete.addEventListener('click', deleteTask)
            span_task.textContent = text;
            span_task.className = 'task-text'
            span_task.addEventListener('dblclick', editSpan);
            span_date.textContent = date;
            span_date.className = 'date';
            li.appendChild(input_checkbox);
            li.appendChild(span_task);
            li.appendChild(span_date);
            li.appendChild(button_delete);
            if (completed) {
                li.classList.add('completed');
                input_checkbox.checked = true;
            }
            li.classList.add('active')
            return li;
}

function saveTasks(){
    tasks = [];
    document.querySelectorAll('li').forEach((li) => {
        let taskText = li.querySelector('.task-text').innerText;
        let taskDate = li.querySelector('.date').innerText;
        let taskCompleted = li.classList.contains('completed');
        tasks.push({
            text: taskText,
            date: taskDate,
            completed: taskCompleted
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    let savedTasks = localStorage.getItem('tasks');
    if(savedTasks){
        savedTasks = JSON.parse(savedTasks)
        savedTasks.forEach(task => {
            taskElement = createTask(task.text, task.date, task.completed)
            ul.appendChild(taskElement)
        })
    }
}
let number = 0;
let task = document.getElementById("input-task");
let ul = document.querySelector('ul');
task.addEventListener("keypress", addTask)