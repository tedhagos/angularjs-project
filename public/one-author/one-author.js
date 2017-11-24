
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
      console.log("author " + author_name);
      return $http.get(`/author/${author_name}`)
                  .then((data) => {
                    return data.data;
                  });
    }

  return {
    fetchAuthor : fetchAuthor
  }
}

app.factory('authorSvc', authorSvc);