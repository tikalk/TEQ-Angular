'use strict';

angular.module('teqAngularApp')
  .controller('QuestionnarieCtrl', function ($scope, $http, $stateParams) {

    $scope.data = [];
    $scope.showThankyou = false;

    $scope.group = $stateParams.groupName;

    $http.get($stateParams.groupName + '.json').then(function (result) {
      $scope.data = result.data;
    }, function (error) {
      console.log(error);
    });


    $scope.categories = function () {
      return _.pluck($scope.data, "title");
    };

    $scope.subCategories = function(index){
      return _.pluck($scope.data[index], "title");
    };

    $scope.sendQuestionnarie = function () {
      $scope.showThankyou = true;
      var body = {
        replyTo: $stateParams.replyToEmail,
        name: $scope.name,
        group: $scope.group,
        data: $scope.data
      };
      console.log($scope.data);

      $http.post('/api/questionnaires', body).then(function () {
        alert('Thanks');
        //TODO redirect to thankyou page
      });
    };


  });
