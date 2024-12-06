app.controller("tourController", function ($scope, $http) {
    $scope.guides = [];
    $scope.newGuide = {};
  
    // Fetch all guides
    $http.get("/api/guides")
      .then(function (response) {
        $scope.guides = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching guides:", error);
      });
  
    // Add a new guide
    $scope.addGuide = function () {
      $http.post("/api/guides", $scope.newGuide)
        .then(function (response) {
          $scope.guides.push(response.data);
          $scope.newGuide = {}; // Reset the form
        })
        .catch(function (error) {
          console.error("Error adding guide:", error);
        });
    };
  
    // Delete a guide
    $scope.deleteGuide = function (id) {
      $http.delete(`/api/guides/${id}`)
        .then(function () {
          $scope.guides = $scope.guides.filter(function (guide) {
            return guide._id !== id;
          });
        })
        .catch(function (error) {
          console.error("Error deleting guide:", error);
        });
    };
  });
  