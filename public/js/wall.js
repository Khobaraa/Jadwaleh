/* eslint-disable no-undef */
const chatForm = document.getElementById('flex-container');
const typingDiv = document.getElementById('typing');

// eslint-disable-next-line no-undef
const socket = io('/wall/');

let userId = getUserId(document.cookie);

let sharedLink = window.location.href + 'give-support/' + userId;
console.log(getUserId(document.cookie));
document.getElementById('text').value = sharedLink;

socket.on('history', payload => {
  payload.forEach(val => {
    outputMessage(val);
  });
});

socket.on('newText', payload => {
  outputMessage(payload);
});

socket.on('typing', val => {
  if (val) {
    typingDiv.innerText = 'Someone is typing on your wall';
  } else {
    typingDiv.innerText = '';
  }
});
chatForm.addEventListener('submit', e => {
  e.preventDefault();


  let text = document.getElementById('supportText').value;

  text = text.trim();

  if (!text) {
    return false;
  }

  socket.emit('addToWall', text);

  chatForm.innerHTML = '';
});

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
