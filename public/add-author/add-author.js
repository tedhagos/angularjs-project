let app = angular.module('app', []);

app.controller('addAuthorCtrl', ($scope, $http) => {

  console.log($scope);

  $scope.author = {};
  $scope.author.books = [];

  $scope.addAuthor = () => {

    $scope.author.books.push($scope.tempbook);
    $scope.tempbook = null;

    let data = {
      lastname: $scope.author.lastname,
      firstname: $scope.author.firstname,
      books: $scope.author.books
    }

    $http.post('/author', $scope.author)
         .then((response) => {
            console.log(response);
         })
    /*
    $http({
      url : '/addtest',
      method: 'POST',
      data: data,
      headers: {'Content-Type' : 'application/json'}
    })
     .then((response) => {
        console.log(response);
      });
      */
  }

});
