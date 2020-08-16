const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USERNAME_LS = "name";

function paintGreeting(name){
  greeting.innerText = `Welcome ${name}!`;
  form.classList.remove("show");
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
}
init();
