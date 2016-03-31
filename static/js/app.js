var myApp = angular.module('www', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/static/views/login.partial',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});
