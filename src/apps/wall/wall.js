module.exports = (io) => {
  const chatDB = require('./model/chat-model');
  const wall = io.of('/wall');
  const moment = require('moment');

  const formatMessage = require('./utils/messages');
  const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
  } = require('./utils/users');

  const botName = 'Jadwaleh Bot';

  // Run when client connects
  wall.on('connection', socket => {
    // let userToken = socket.request.rawHeaders.filter(val => {if (val.includes('token')) return val; })[0];
    // userToken = userToken.substring(userToken.indexOf('token=')).split('=')[1];
    // console.log('userToken?????',userToken);

    socket.on('joinRoom', async ({ room }) => {
      let userToken = socket.request.rawHeaders.filter(val => { if (val.includes('token')) return val; })[0];
      userToken = userToken.substring(userToken.indexOf('token=')).split(';')[0].split('=')[1];
      let username = userToken;/////////////////////////////////
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
      wall.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);

      chatDB.create({ username: user.username, room: user.room.toLowerCase(), unixTime: Date.now(), time: moment().format('h:mm a'), text: msg });
      wall.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
        wall.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`),
        );

        // Send users and room info
        wall.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });



};