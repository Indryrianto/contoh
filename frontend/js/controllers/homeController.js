app.controller("homeController", function ($scope, $http) {
  $scope.tours = [];
  $scope.newTour = {};

  // Ambil semua data
  $http.get("http://localhost:5001/api/tours").then((response) => {
    $scope.tours = response.data;
  });

  // Tambah data baru
  $scope.addTour = () => {
    $http
      .post("http://localhost:5001/api/tours", $scope.newTour)
      .then((response) => {
        $scope.tours.push(response.data);
        $scope.newTour = {};
      });
  };

  // Hapus data
  $scope.deleteTour = (id) => {
    $http.delete(`http://localhost:5001/api/tours/${id}`).then(() => {
      $scope.tours = $scope.tours.filter((tour) => tour._id !== id);
    });
  };

  // Edit data (contoh implementasi sederhana)
  $scope.editTour = (tour) => {
    $scope.newTour = angular.copy(tour); // Salin data untuk diedit
    $http
      .put(`http://localhost:5001/api/tours/${tour._id}`, $scope.newTour)
      .then((response) => {
        const index = $scope.tours.findIndex((t) => t._id === tour._id);
        $scope.tours[index] = response.data;
        $scope.newTour = {};
      });
  };
});
