const form = document.querySelector("form");
messageList = document.querySelector("ul");

var name;

const socket = io();
const buttonSend = document.getElementById("submit");

$(".usernameInput").keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    setUsername();
  }
});

//if breaks delete this
function setUsername(){
  var input = document.querySelectorAll("input")[1];
  name = input.value;
  input.value = "";

}

function sendMessage(e){
  
  var input = document.querySelectorAll("input")[0];
  var tempMessage = name + ": " + input.value;
  e.preventDefault();
  socket.emit("message", tempMessage); //emits "message"
  input.value = "";
}
// looks for button click to send message
form.addEventListener("submit", sendMessage);
// function to put message on website
function addMessageToHTML(message){
    const li = document.createElement("li");
    li.innerText = message;
    messageList.append(li);
}
// recieves emits from server to know that we have to write a message
socket.on("message", (data) => {

  addMessageToHTML(data);
}); 
// function to say user connected
function alertUserConnected(){
  addMessageToHTML("User Connected");
}
// checks for server to emit connection
socket.on("user connected", alertUserConnected);