'use strict';

angular.module('201409SoloApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    $scope.room;
    $scope.joinRoom;
    $scope.username;
    $scope.createGame = function(){
      console.log(socket);
      console.log("clicked");
      $scope.room = Math.floor(Math.random()*10000);
      var dataObject = {room: $scope.room, host: true}
      socket.dataObject = dataObject
      socket.socket.emit("createGame", dataObject);
    }
    $scope.joinGame = function(){
      console.log($scope.joinRoom);
      var dataObject = {room: $scope.joinRoom, host: false, username: $scope.username}
      socket.dataObject = dataObject
      socket.socket.emit("joinGame", dataObject);
    }


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
