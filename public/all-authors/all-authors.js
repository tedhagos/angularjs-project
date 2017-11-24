let app = angular.module('app', []);

app.controller('authorController', ($scope, $http) => {
  $http.get('/author/')
       .then((data) => {
         $scope.authors = data.data;
         console.log(data.data);
       },
      (err) => {
        $scope.error = err;
        console.log(err);
      });
});