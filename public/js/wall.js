const chatForm = document.getElementById('flex-container');
const typingDiv = document.getElementById('typing');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// eslint-disable-next-line no-undef
const socket = io('/wall/');

let userId =getUserId(document.cookie);

let sharedLink =window.location.href +'give-support/'+userId;
console.log(getUserId(document.cookie));
document.getElementById('text').value=sharedLink;
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
    typingDiv.innerText = 'Someone is typing on your wall';
  } else {
    typingDiv.innerText = '';
  }
});
// Message submit
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
function outputMessage(payload) {
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerText = payload.text;
  let time = moment(payload.unixTime).format('MMMM Do YYYY, h:mm a');
  p.innerHTML += `<span>          ${time}</span>`;
  div.appendChild(p);
  chatForm.appendChild(div);
}

var qrcode = new QRCode(document.getElementById('qrcode'), {
  text: 'http://jindo.dev.naver.com/collie',
  width: 128,
  height: 128,
  colorDark: '#00f',
  colorLight: '#ffffff',
  correctLevel: QRCode.CorrectLevel.H,
});

function makeCode() {
  var elText = document.getElementById('text');

  if (!elText.value) {
    alert('Input a text');
    elText.focus();
    return;
  }

  qrcode.makeCode(elText.value);
}

makeCode();

$('#text').
  on('blur', function () {
    makeCode();
  }).
  on('keydown', function (e) {
    if (e.keyCode == 13) {
      makeCode();
    }
  });

function getUserId(cookies) {
  let userId = cookies.substring(cookies.indexOf('userId=')).split('=')[1];
  return userId;
}
