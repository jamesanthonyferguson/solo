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
    $scope.add = function(bool){
        if (bool) {
        var temp = {q: $scope.question, a: {1: $scope.a1, 2: $scope.a2, 3: $scope.a3, 4: $scope.a4}, correct: $scope.correct}
        $scope.list.push(temp);
        $http.post('/api/things', temp)
          .success(function(){
            console.log('posted');
            $scope.reset();
          });
      // $scope.submit(temp);
      }
   }
   $scope.reset = function(){
    $scope.question = undefined;
    $scope.a1 = undefined;
    $scope.a2 = undefined;
    $scope.a3 = undefined;
    $scope.a4 = undefined;
    $scope.correct = undefined;
   }
    // $scope.submit = function(data){
    //   $http.post('/api/things', data)
    //   .success(console.log('posted'))
    // }

  });
