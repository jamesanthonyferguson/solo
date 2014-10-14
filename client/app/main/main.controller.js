'use strict';

angular.module('201409SoloApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    socket.socket.on('starting', function(){
      console.log("Your game is starting!")
      $scope.getQuestions(function(){
        $scope.gameplay = true;
        $scope.settings = false;
      })
    })
    socket.socket.on('nextQuestion', function(){
      console.log('time for the next question');
      $scope.answered = false;
      if (!socket.socket.host) {
        $scope.current = $scope.current + 1;
        $scope.question = $scope.questions[$scope.current];
      }
    })
    socket.socket.on('gameOver', function(data){
      $scope.endGame(data);
    })
    $scope.questions;
    $scope.getQuestions = function(callback){
      $http.get('/api/things')
      .success(function(data){
        console.log("YOUR DATA HAS BEEN COLLECTED:",data);
        $scope.questions = data;
        $scope.question = $scope.questions[0];
        callback();
      })
    }
    $scope.settings = true;
    $scope.gameplay = false;
    $scope.answered = false;
    $scope.gameEnd = false;
    $scope.results;
    $scope.current = 0;
    $scope.question;
    $scope.room;
    $scope.joinRoom;
    $scope.username;
    $scope.endGame = function(data){
      console.log("end game triggered");
      $scope.results = data;
      $scope.gameEnd = true;
      $scope.gameplay = false;
    }
    $scope.gameOver = function(){
      if (socket.dataObject && socket.dataObject.host) {
        console.log("game ending");
        socket.socket.emit("gameOver", socket.dataObject.room);
      }
    }
    $scope.startGame = function(){
      if (socket.dataObject && socket.dataObject.host) {
        $scope.getQuestions();
        socket.socket.emit("start", socket.dataObject.room);
        console.log('meow');
        $scope.gameplay = true;
        $scope.settings = false;
      }
    }
    $scope.createGame = function(){
      console.log(socket);
      console.log("clicked");
      $scope.room = Math.floor(Math.random()*10000);
      var dataObject = {room: $scope.room, host: true, username: 'host'};
      socket.dataObject = dataObject;
      socket.socket.emit("createGame", dataObject);
    }
    $scope.joinGame = function(){
      console.log($scope.joinRoom);
      var dataObject = {room: $scope.joinRoom, host: false, username: $scope.username}
      socket.dataObject = dataObject
      socket.socket.emit("joinGame", dataObject);
    }
    $scope.nextQuestion = function(){
      if (socket.dataObject.host){
        console.log("next question");
        $scope.current = $scope.current + 1;
        $scope.question = $scope.questions[$scope.current];
        socket.socket.emit("nextQuestion", $scope.room);
      }
    }
    $scope.answer = function(num){
      if (!socket.dataObject.host) {
        if (!$scope.answered){
          $scope.answered = true;
          console.log(socket);
          var correct = false;
          if (num === $scope.question.correct) {
            correct = true;
          }
          var dat = {q: $scope.current, a: num, r: socket.dataObject.room, u: socket.dataObject.username, c: correct}
          console.log('answering:', dat);
          socket.socket.emit("answer", dat);
        }
      }
    }
});
