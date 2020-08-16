const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList"),
      toDoFinishList = document.querySelector(".js-toDofinishList"),
      previousOperand = document.querySelector(".previous-operand");

const TODOS_LS = 'toDos';
const DONE_LS = 'finished';

let toDos = [];
let finished = [];

function makeDefualt(task){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.addEventListener("click", deleteToDo);
  delBtn.innerText = "X";
  span.innerText = task;
  li.append(span, delBtn);
  return li;
}

function successToDo(event){
  const backBtn = document.createElement("button");
  const btn = event.target;
  const li = btn.parentNode;
  const newDoneId = li.id;
  const newidString = newDoneId.toString();
  const span = li.querySelector("span");
  backBtn.innerText = "Re";
  li.appendChild(backBtn);
  li.removeChild(btn);
  const doneObj = {
    text: span.innerText,
    id: newidString
  };
  finished.push(doneObj);
  toDoList.removeChild(li);
  toDoFinishList.appendChild(li);
  backBtn.addEventListener("click", backTodo);
  let sucToDos = toDos.filter(function(toDo){
    return toDo.id !== li.id;
  });
  toDos = sucToDos;
  saveToDos();
  saveDone();
}

function backTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const successBtn = document.createElement("button");
  const span = li.querySelector("span");
  successBtn.innerText = "O";
  li.removeChild(btn);
  li.appendChild(successBtn);
  const toDoObj = {
    text: span.innerText,
    id: li.id
  };
  toDos.push(toDoObj);
  toDoFinishList.removeChild(li);
  toDoList.appendChild(li);
  successBtn.addEventListener("click", successToDo);
  const backDone = finished.filter(function(back){
    return back.id !== li.id;
  });
  finished = backDone;
  saveDone();
  saveToDos();
}

function deleteToDo(event){
  let btn = event.target;
  let li = btn.parentNode;
  let ul = li.parentNode;
  if(ul.classList.contains('js-toDoList')){
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
      return toDo.id !== li.id;
    });
    toDos = cleanToDos;
    saveToDos();
  } else {
    toDoFinishList.removeChild(li);
    const cleanDone = finished.filter(function(done){
      return done.id !== li.id;
    });
    finished = cleanDone;
    saveDone();
  }
}

function saveDone(){
    localStorage.setItem(DONE_LS, JSON.stringify(finished));
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(task){
  const li = makeDefualt(task);
  const successBtn = document.createElement("button");
  const newId = Math.floor(Math.random()*100000000000);
  const idString = newId.toString();
  successBtn.innerText = "O";
  li.id = newId;
  li.append(successBtn);
  toDoList.appendChild(li);
  successBtn.addEventListener("click", successToDo);
  const toDoObj = {
    text: task,
    id: idString
  };
  toDos.push(toDoObj);
  saveToDos();
}

function loadToDo(task, todoId){
  const successBtn = document.createElement("button");
  const li = makeDefualt(task);
  successBtn.innerText = "O";
  li.append(successBtn);
  toDoList.appendChild(li);
  successBtn.addEventListener("click", successToDo);
  const toDoObj = {
    text: task,
    id: todoId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintDone(task, getId){
  const li = makeDefualt(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "Re";
  li.append(backBtn);
  toDoFinishList.appendChild(li);
  backBtn.addEventListener("click", backTodo);
  const doneObj = {
    text: task,
    id: getId
  };
  finished.push(doneObj);
  saveDone();
}

function handleSubmit(){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadList(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const loadedFinished = localStorage.getItem(DONE_LS);
  if(loadedToDos !== null){
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(toDo){
      loadToDo(toDo.text, toDo.id);
    })
  }
  if(loadedFinished !== null){
    const parseDone = JSON.parse(loadedFinished);
    parseDone.forEach(function(done){
      paintDone(done.text, done.id);
    })
  }
}

function init(){
    toDoInput.addEventListener('focus', (event) => {
      previousOperand.innerText = "Have a good day!";
  });
    toDoInput.addEventListener('blur', (event) => {
    previousOperand.innerText = '';
  });
  loadList();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
