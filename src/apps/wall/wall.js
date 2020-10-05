module.exports = (io) => {
  const events = require('events');
  var eventEmitter = new events.EventEmitter();
  const wallDB = require('./model/wall-model');
  const giveSupport = io.of('/wall/give-support');
  const moment = require('moment');
  const wall = io.of('/wall/');

  wall.on('connection', async socket => {
    // let userToken = socket.request.rawHeaders.filter(val => { if (val.includes('token')) return val; })[0];
    // userToken = userToken.substring(userToken.indexOf('ownerId=')).split(';')[0].split('=')[1];
    // let ownerId = userToken;
    let ownerId ='3344434343434';
    let payload = await wallDB.get({ownerId});
    wall.to(socket.id).emit('history',payload);
    eventEmitter.on('typing', val => {
      wall.to(socket.id).emit('typing',val);
    });
    eventEmitter.on('newText',payload => {
      wall.to(socket.id).emit('newText',payload);
    });

  });
  // Run when client connects
  giveSupport.on('connection', socket => {
    console.log('joined');
    socket.on('userId', async (ownerId) => {
      socket.join(ownerId);
      socket.on('addToWall', async (text) => {
        let payload = await wallDB.create({ ownerId, unixTime: Date.now(), text });
        eventEmitter.emit('typing',false);
        // eventEmitter.emit('notification','Someone Posted on Your Wall');
        eventEmitter.emit('newText',payload);

        
        giveSupport.in(ownerId).emit('notification', payload);
      });
    });
    socket.on('typing',val=> {
      eventEmitter.emit('typing',val);
    });
    socket.on('disconnect',()=>{
      eventEmitter.emit('typing',false);
    });
    
  });



};