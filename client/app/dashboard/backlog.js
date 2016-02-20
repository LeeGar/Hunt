angular.module('hunt.backlog', [])

.controller('BacklogController', function ($scope, $location, Backlog) {

  $scope.backlog = {};
  $scope.backlogs = '';

  var initializeBacklogs = function () {
    // Query the DB for all backlogs using the function in server controller 
    //  On success, assign $scope.backlog to the data returned from query
    Backlog.getBacklogs()
      .then(function (data) {
        $scope.backlogs = data;
      })
      .catch(function (error) {
        console.log('Error initializing backlogs: ', error);
      });
  }

  $scope.addBacklog = function () {

  };

  $scope.removeBacklog = function () {

  };

  $scope.moveToAppSubmitted = function () {

  };

  $scope.submitChanges = function () {

    $scope.backlogChanges = {
      notes: $scope.backlogNotes,
      status: $scope.backlogStatus
    };

    Backlog.submitBacklogChanges($scope.backlogChanges)
      .then(function () {
        console.log('Backlog changes submitted!');
        $location.path('/main');
      })
      .catch(function (error) {
        console.log("There was an error submitting changes to backlog.", error);
      });
  };

  initializeBacklogs();
});
