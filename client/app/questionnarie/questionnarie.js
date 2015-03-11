'use strict';

angular.module('teqAngularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionnarie', {
        url: '/questionnarie',
        templateUrl: 'app/questionnarie/questionnarie.html',
        controller: 'QuestionnarieCtrl'
      });
  });