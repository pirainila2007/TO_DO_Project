let button = document.getElementById('addBtn');
let todolist = document.getElementById('todolist');
let input = document.getElementById('taskInput');

let todos = [];

button.addEventListener('click', () => {
  if (input.value.trim() !== "") {
    todos.push(input.value);
    addTodo(input.value);
    input.value = "";
  }
});

function addTodo(todo) {
  let para = document.createElement('p');
  para.innerText = todo;
  para.classList.add('task-item');
  todolist.appendChild(para);

 
  para.addEventListener('click', () => {
    para.classList.toggle('complete');
  });


  para.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    todolist.removeChild(para);
  });
}

