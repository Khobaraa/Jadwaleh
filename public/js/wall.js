const chatForm = document.getElementById('flex-container');
const typingDiv = document.getElementById('typing');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// eslint-disable-next-line no-undef
const socket = io('/wall/');

// Join chatroom
// Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });
// Old Messages from Server
socket.on('history', payload => {
  payload.forEach(val => {
    outputMessage(val);
  });
});
socket.on('newText', payload => {
  console.log('newText>>>>>>>>>>', payload);
  outputMessage(payload);
});


// Message from server
socket.on('typing', val => {
  if (val) {
    typingDiv.innerText = 'Some one is typing on your wall';
  } else {
    typingDiv.innerText = '';
  }
});
// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();


  let text = document.getElementById("supportText").value;

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
function outputMessage(payload) {
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerText = payload.text;
  let time =  moment(   payload.unixTime).format('MMMM Do YYYY, h:mm a');
  p.innerHTML += `<span>          ${time}</span>`;
  div.appendChild(p);
  chatForm.appendChild(div);
}

