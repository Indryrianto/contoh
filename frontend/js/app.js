const app = angular.module("myWebsite", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/tour", {
      templateUrl: "views/tour.html",
      controller: "tourController",
    })
    .otherwise({
      redirectTo: "/tour",
    });
});
