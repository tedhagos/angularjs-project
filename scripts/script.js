

function ctrl($scope, $http){

  fetchAuthor();


  function fetchAuthor() {
    $http.get('/author')
         .then(authorFetchComplete, authorFetchError);
  }

  function authorFetchComplete(data){
    $scope.authors = data.data;
  }
  function authorFetchError(err){
    console.log(err);
  }
  
}