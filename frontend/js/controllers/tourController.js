app.controller("tourController", function ($scope, $http) {
  $scope.tours = [];
  $scope.newTour = {};
  $scope.editMode = false; // Flag untuk mode edit
  $scope.selectedTour = null;

  // Ambil semua data
  $http.get("http://localhost:5001/api/tours").then((response) => {
    $scope.tours = response.data;
  });

  // Tambah data baru
  $scope.addTour = () => {
    if ($scope.editMode) {
      // Update data
      $http
        .put(
          `http://localhost:5001/api/tours/${$scope.selectedTour._id}`,
          $scope.newTour
        )
        .then((response) => {
          const index = $scope.tours.findIndex(
            (tour) => tour._id === $scope.selectedTour._id
          );
          $scope.tours[index] = response.data;
          $scope.resetForm();
        });
    } else {
      // Tambah data baru
      $http
        .post("http://localhost:5001/api/tours", $scope.newTour)
        .then((response) => {
          $scope.tours.push(response.data);
          $scope.resetForm();
        });
    }
  };

  // Hapus data
  $scope.deleteTour = (id) => {
    $http.delete(`http://localhost:5001/api/tours/${id}`).then(() => {
      $scope.tours = $scope.tours.filter((tour) => tour._id !== id);
    });
  };

  // Edit data
  $scope.editTour = (tour) => {
    $scope.editMode = true;
    $scope.selectedTour = tour;
    $scope.newTour = angular.copy(tour); // Salin data untuk diedit
  };

  // Reset Form
  $scope.resetForm = () => {
    $scope.newTour = {};
    $scope.editMode = false;
    $scope.selectedTour = null;
  };
});
