var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var gulp = require('gulp')


// app.set('views', path.join(__dirname, 'ui'));
// // app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'ui')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});


gulp.task('connect', function() {
		   http.listen(3000, function(){
		   console.log('listening on *:3000');
		});
});
gulp.task('default', ['connect']);
