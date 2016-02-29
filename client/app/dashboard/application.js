angular.module('hunt.application', ['hunt.users'])

.controller('ApplicationController', function ($scope, $rootScope, Application, Backlog) {
  // called when 'submit' is clicked after job title & company are entered in search
  $scope.addApplication = function () {
    // only create application if job title and company name are not empty or whitespace
    if ($scope.jobTitle.trim().length && $scope.company.trim().length) {
      // user id is added on the backend
      var applicationData = {
        jobTitle: $scope.jobTitle,
        company: $scope.company
      };

      Application.createApplication(applicationData)
      .then(function(application) {
        var newBacklog = {
          application_id: application.id,
          status: 'Pending'
        };
        Backlog.addBacklog(newBacklog)
        .then(function(backlog) {
          $rootScope.backlogs.push(backlog);
        });
      });
    }
    $scope.jobTitle = '';
    $scope.company = '';
  };
})

.factory('Application', function ($http) {
  // returns the application object, including id. The id is used
  // when creating the backlog object (see above).
  var createApplication = function(application) {
    return $http({
      method: 'POST',
      url: '/api/applications',
      data: application
    }).then(function(res) {
      return res.data;
    }).catch(function (error) {
      console.error(error);
    });
  };

  return {
    createApplication: createApplication
  };
});
