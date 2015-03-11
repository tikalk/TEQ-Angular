'use strict';

angular.module('teqAngularApp')
  .controller('QuestionnarieCtrl', function ($scope, $http) {
    $scope.groups = ['DevOps', 'Java', 'Javascript', 'Ruby', 'Android'];

    $scope.data = {};

    $scope.$watch('group', function (newVal, oldVal) {
      console.log('oldVal:'+oldVal);
      console.log('newVal:'+newVal);
      if(!newVal){
        return;
      }

      $http.get(newVal + '.json').then(function (result) {
        $scope.data = result.data;
      }, function (error) {
        console.log(error);
      });
    });

    $scope.categories = function () {
      return Object.keys($scope.data);
    };

    $scope.subCategories = function(category){
      return Object.keys($scope.data[category]);
    };

    $scope.sendQuestionnarie = function () {
      console.log($scope.data);
    };


  });
