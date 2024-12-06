app.service("tourService", function ($http) {
  this.getTours = function () {
    return $http.get("http://localhost:5001/api/tours");
  };
});
