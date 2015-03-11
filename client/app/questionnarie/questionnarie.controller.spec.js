'use strict';

describe('Controller: QuestionnarieCtrl', function () {

  // load the controller's module
  beforeEach(module('teqAngularApp'));

  var QuestionnarieCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionnarieCtrl = $controller('QuestionnarieCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
