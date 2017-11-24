
let app = angular.module('app', []);

// DIRECTIVE
app.directive('authorCard', () => {
  return {
    templateUrl: "author-card.html",
    controller: ($scope, authorSvc) => {
      
      $scope.findAuthor = (author_name) => {
        console.log("click %", author_name);
        let prom = authorSvc.fetchAuthor(author_name);
        prom.then((data) => {
          $scope.author = data;
        });
      }

      $scope.addBook = (bookName) => {
        console.log(bookName);
        $scope.author.books.push(bookName);
      }
      
      $scope.updateAuthor = (authorObj) => {
        let prom = authorSvc.updateAuthor(authorObj)
        prom.then((response) => {
          $scope.message = response;
        });         
      }

      $scope.deleteBook = (book) => {
        let elem = $scope.author.books.indexOf(book);
        console.log(elem);
        if(elem > -1) {
          $scope.author.books.splice(elem, 1);
          console.log($scope.author.books);
          $scope.updateAuthor($scope.author);
        }
      }
    }
  }
});

app.directive('addEnter', () => {
  console.log("add Enter");
  return {
    restrict: 'A',
    link : (scope, el, attrs) => {
      el.bind("keydown", function(evt) {
        if(evt.which === 13) {
          scope.author.books.push(el.val());
          el.val("");
          scope.updateAuthor(scope.author);
          console.log(scope.author);          
        }
      });
    }
  }
});

app.directive('searchEnter', function(){
  return {
    link : function(scope, el, attrs){
      el.bind('keydown', function(evt){
        //console.log(evt.which);
        if(evt.which === 13) {
          scope.findAuthor(el.val());
        }
      });
    }
  }  
});

// SERVICE
const authorSvc = ($http) => {
  console.log("service intializes");
    const fetchAuthor = (author_name) => {
      //console.log("author " + author_name);
      return $http.get(`/author/${author_name}`)
                  .then((data) => {
                    return data.data;
                  });
    }

    const updateAuthor = (author) => {
      return $http.put('/author', author)
                  .then((response) => {
                    return response.data;
                  });
    }

  return {
    fetchAuthor : fetchAuthor,
    updateAuthor : updateAuthor
  }
}

app.factory('authorSvc', authorSvc);