var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(9000);

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// // routing
// app.all('/', function (req, res) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.sendfile(__dirname + '/index.html');
// });

var masterSelected = false;
var master = null;

io.sockets.on('connection', function (socket) {

   // when the master sends 'sendupdate', this listens and executes
   socket.on('sendupdate', function (data) {
      console.log("received update from client : " + data);
      io.sockets.emit('update', "master", data);
   });

   //the master is selected
   socket.on('selectMaster', function (data) {
      console.log("received selectMaster : " + data);
      if (!masterSelected) {
         setMaster(socket);
      }
   });

   socket.on('clearMaster', function (data) {
      console.log("received clearMaster : " + data);
      if (masterSelected) {
         clearMaster();
      }
   });

   function broadcastMasterStatus() {
      console.log("broadcasting masterSelected : " + masterSelected);
      io.sockets.emit('masterSelected', masterSelected);
   }

   function setMaster(socket) {
      masterSelected = true;
      master = socket;
      broadcastMasterStatus();
   }
   
   function clearMaster() {
      master = null;
      masterSelected = false;
      broadcastMasterStatus();
   }   

   //new client joined
   broadcastMasterStatus();
   
   /*
   // when the client emits 'adduser', this listens and executes
   socket.on('adduser', function(username){
      // we store the username in the socket session for this client
      socket.username = username;
      // add the client's username to the global list
      usernames[username] = username;
      // echo to client they've connected
      socket.emit('updatechat', 'SERVER', 'you have connected');
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
      // update the list of users in chat, client-side
      io.sockets.emit('updateusers', usernames);
   });
   */

   // when the user disconnects.. perform this
   socket.on('disconnect', function(){
      if (socket == master) {
         clearMaster();
      }
   });
});