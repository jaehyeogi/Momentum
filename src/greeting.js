const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");
const name = document.getElementById('name');
const userTodoList = document.getElementById('user-todo-list');

const USERNAME_LS = "name";

function paintGreeting(name){
  greeting.innerText = `Welcome ${name}!`;
  greeting.classList.add("transition");
  form.classList.remove("show");
  userTodoList.innerText = `${name}'s TODO list`
}

function saveGreeting(name){
  localStorage.setItem(USERNAME_LS, name);
}

function handleGreeting(event){
  event.preventDefault();
  const userName = input.value;
  paintGreeting(userName);
  saveGreeting(userName);
}

function askForName(){
  form.classList.add("show");
  form.addEventListener("submit", handleGreeting);
}

function loadName(){
  const currentUser = localStorage.getItem(USERNAME_LS);
  if(currentUser === null){
      askForName();
  } else {
      paintGreeting(currentUser);
  }
}


function init(){
  loadName();
  input.addEventListener('focus', (event) => {
    name.innerText = "Welcome!";
  input.addEventListener('blur', (event) => {
    name.innerText = '';
  });
});
}
init();
