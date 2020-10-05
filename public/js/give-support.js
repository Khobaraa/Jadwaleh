const chatForm = document.getElementById('chat-form');
const supportText = document.getElementById('supportText');
let typingKey = false;
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// eslint-disable-next-line no-undef
var socket = io('/wall/give-support');

// Get username and room from URL
// eslint-disable-next-line no-undef
const ownerId = window.location.href.split('/wall/give-support/')[1];

// Join chatroom
socket.emit('userId', ownerId);

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});
// Old Messages from Server
socket.on('history', messages => {
  messages;
  messages.forEach(message => {
    outputMessage(message);
  });
});

supportText.addEventListener('input', function () {
  if (!typingKey) {
    socket.emit('typing',true);
  }
});


chatForm.addEventListener('submit', e => {
  e.preventDefault();
  let text = document.getElementById('supportText').value;

  text = text.trim();

  if (!text) {
    return false;
  }

  // Emit message to server
  socket.emit('addToWall', text);

  // Clear input
  chatForm.innerHTML = '';
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
