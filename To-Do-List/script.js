document.addEventListener('DOMContentLoaded',()=>{
const taskInput = document.getElementById("todo-input")
const addTaskBtn = document.getElementById("add-task-btn")
const taskList = document.getElementById("todo-list");


let tasks = JSON.parse(localStorage.getItem("task")) || [];
console.log(typeof(tasks));
tasks.forEach(element => {
   renderTasks(element);
});
addTaskBtn.addEventListener("click",()=>{
  let input = taskInput.value.trim();
  if(input == ""){ 
    return;
  }
  let newTask = {
    id:Date.now(),
    text: input,
    completed: false
  };
  tasks.push(newTask);
  renderTasks(newTask);
  saveTasks();
  taskInput.value = " ";
  console.log(tasks);
});

function renderTasks(task){
 const li = document.createElement('li');
 li.setAttribute('data-id',task.id);
 if(task.completed) li.classList.add(completed);
 li.innerHTML=`
 <span>${task.text}</span>
 <button><svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>`
 taskList.appendChild(li);
 saveTasks();
li.addEventListener("click",(e)=>{
  if (e.target.tagName == "BUTTON")  return;
  task.completed = !task.completed;
  li.classList.toggle("completed");
})
li.querySelector('button').addEventListener("click",(e)=>{
  e.stopPropagation(); //prevent toggle from firing
  tasks = tasks.filter((t) => element.id == li.id )
      li.remove();
      saveTasks();
    }
  )
};


function saveTasks(){
  localStorage.setItem("task",JSON.stringify(tasks));
}

localStorage.clear();
});
