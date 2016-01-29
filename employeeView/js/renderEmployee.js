var employeeApp = angular.module( 'employeeApp', []);

//no ES6 arrow function bc it seems to fail in Safari
employeeApp.controller('EmployeeController', function($scope, $http) {

  $http.get('/employees').then( function( res ) {
    $scope.employees = res.data;//Angular specific
  });
});
