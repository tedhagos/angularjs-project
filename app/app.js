(function(){
  
  var app = angular.module('app', ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider
      .when('/add', {
        controller  : 'authorController',
        templateUrl : 'views/addauthor.html'
      })
      .when('/edit',{
        controller  : 'authorController',
        templateUrl : 'views/editauthor.html'
      })
      .otherwise({redirectTo: '/add'});
  });


  app.controller('authorController', function($http, $scope){

    authorFetch();

    $scope.a = {
      lastname: '',
      firstname: '',
      books: []
    }

    $scope.addBook = function(mbook){
      $scope.a.books.push(mbook);
      $scope.booktemp = null
    }


    $scope.editAuthor = function(mauthor){
      //alert(a.lastname + a.firstname + a._id);
      $scope.a = mauthor;
    }

    $scope.updateAuthor = function (mauthor){
      $http({
        url: '/author',
        method: 'PUT',
        data: mauthor,
        headers: {'Content-Type': 'application/json'}
      }).
      success(function(data){
        console.log("Succeeded in update " + data);
        $scope.authors = authorFetch();
      }).
      error(function(data){
        console.log("Error Updating " + data);
      });
    };

    $scope.saveAuthor = function(mauthor) {
      var formdata = {lastname: mauthor.lastname, firstname: mauthor.firstname, books: mauthor.books};
      $http({
        url : '/author',
        method: 'POST',
        data: formdata,
        headers: {'Content-Type' : 'application/json'}
      }).
      success(function(data){
        console.log(data)
        //$scope.authors = data;
        authorFetch();
      }).
      error(function(data){
        console.log("Error " + data);
      });

    // clear the contents of the textfields
    $scope.a.lastname = null;
    $scope.a.firstname = null


    };

    function authorFetch(){
      $http.get('/author').
      success(function(data){
        $scope.authors = data;
      }).
      error(function(data){
        console.log("Error " + data);
      });
    };

  });

  app.controller('authorListController', function($scope, $http){
    $http.get('/author').
    success(function(data){
      $scope.authors = data;
    }).
    error(function(data){
      console.log("Error " + data);
    });
  });

})();
