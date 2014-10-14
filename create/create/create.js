'use strict';

angular.module('201409SoloApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: '../create/create/create.html',
        controller: 'CreateCtrl'
      });
  });