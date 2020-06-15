(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  console.log("Inside routes.js");
  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/template/home.template.html'
  })

  // Premade list page
  .state('categoriesList', {
    url: '/categories-list',
    templateUrl: 'src/template/main-categories.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
              .then(function(response){
                return response.data;
              });
      }]
    }
  })


  .state('itemsList', {
    url: '/items-list/{categoryShortName}',
    templateUrl: 'src/template/main-items.template.html',
    controller: 'ItemsListController as itemsList',
    resolve: {
      items: ['$stateParams','MenuDataService',
              function ($stateParams,MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                  .then(function(response){
                      return response.data;
                  });
              }]
    }
  });
}

})();
