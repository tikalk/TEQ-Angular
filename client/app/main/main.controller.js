'use strict';

angular.module('teqAngularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.groups = ['DevOps', 'Java', 'Javascript', 'Ruby', 'Android'];

    $scope.encodeEmail = function () {
      return btoa($scope.repEmail);
    }

  });
