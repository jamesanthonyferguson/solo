'use strict';

angular.module('201409SoloApp')
  .controller('CreateCtrl', function ($scope, $http) {
    $scope.question;
    $scope.a1;
    $scope.a2;
    $scope.a3;
    $scope.a4;
    $scope.correct;
    $scope.list = []
    $scope.add = function(){
      var temp = {q: $scope.question, a: {1: $scope.a1, 2: $scope.a2, 3: $scope.a3, 4: $scope.a4}, correct: $scope.correct}
      $scope.list.push(temp);
      $http.post('/api/things', temp)
        .success(console.log('posted'));
      // $scope.submit(temp);
    }
    // $scope.submit = function(data){
    //   $http.post('/api/things', data)
    //   .success(console.log('posted'))
    // }

  });
