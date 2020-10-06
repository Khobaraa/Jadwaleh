module.exports = (io) => {
  const chatDB = require('./model/chat-model');
  const chat = io.of('/chatRoom');
  const moment = require('moment');
  const jwt = require('jsonwebtoken');
  const SECRET = 'mytokensecret';

  const formatMessage = require('./utils/messages');
  const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
  } = require('./utils/users');

  const botName = 'Jadwaleh Bot';

  // Run when client connects
  chat.on('connection', socket => {
    // let userToken = socket.request.rawHeaders.filter(val => {if (val.includes('token')) return val; })[0];
    // userToken = userToken.substring(userToken.indexOf('token=')).split('=')[1];
    // console.log('userToken?????',userToken);

    socket.on('joinRoom', async ({ room }) => {
      let userToken = socket.request.rawHeaders.filter(val => { if (val.includes('token')) return val; })[0];
      userToken = userToken.substring(userToken.indexOf('token=')).split(';')[0].split('=')[1];
      let username = jwt.verify(userToken, SECRET).username;

      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // send Last50MessagesByRoom
      let last50Messages = await chatDB.getNumberOfLastMessagesByRoom({ room: user.room.toLowerCase() }, 50);
      socket.emit('history', last50Messages.reverse());
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to Chat!'));

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName, `${user.username} has joined the chat`),
        );

      // Send users and room info
      chat.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);

      chatDB.create({ username: user.username, room: user.room.toLowerCase(), unixTime: Date.now(), time: moment().format('h:mm a'), text: msg });
      chat.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
        chat.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`),
        );

        // Send users and room info
        chat.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });



};