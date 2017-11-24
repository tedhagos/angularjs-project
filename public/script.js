const app = angular.module('app', ['ngRoute']);

app.config(($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/all-authors', {
      templateUrl: ''
    })
    .when('/one-author', {
      templateUrl: ''
    })
    .when('/add-author', {
      templateUrl: ''
    })
    .when('/add-book', {
      templateUrl: ''
    })
});