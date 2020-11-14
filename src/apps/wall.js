module.exports = (io) => {
  const events = require('events');
  var eventEmitter = new events.EventEmitter();
  const wallDB = require('../models/wall-model');
  const giveSupport = io.of('/wall');
  const wall = io.of('/myWall');

  wall.on('connection', async socket => {
    console.log('wall connected');
    let ownerId = socket.handshake.query.userId;
    let payload = await wallDB.get({ ownerId });
    wall.to(socket.id).emit('history', payload);
    eventEmitter.on('typing', val => {
      wall.to(socket.id).emit('typing', val);
    });
    eventEmitter.on('newText', payload => {
      wall.to(socket.id).emit('newText', payload);
    });
    socket.on('disconnect', () => {
      console.log('socket in wall is disconnected');
    });
  });

  // Run when client connects
  giveSupport.on('connection', socket => {
    console.log('joined giveSupport');
    socket.on('userId', async (ownerId) => {
      socket.join(ownerId);
      socket.on('addToWall', async (text) => {
        console.log('text><<>>>>>>>', text);
        let payload = await wallDB.create({ ownerId, unixTime: Date.now(), text });
        eventEmitter.emit('typing', false);
        eventEmitter.emit('newText', payload);
        giveSupport.in(ownerId).emit('notification', payload);
      });
    });
    socket.on('typing', val => {
      console.log(val);
      eventEmitter.emit('typing', val);
    });
    socket.on('disconnect', () => {
      eventEmitter.emit('typing', false);
      console.log('socket in giveSupport is disconnected');
      // eventEmitter.removeListener('newText', () => { });
      // eventEmitter.removeListener('typing', () => { });
    });
  });
};