'use strict';

angular.module('teqAngularApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionnarie', {
        url: '/questionnarie/:groupName/:replyToEmail',
        templateUrl: 'app/questionnarie/questionnarie.html',
        controller: 'QuestionnarieCtrl'
      });
  });
