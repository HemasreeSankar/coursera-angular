(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope : {
      found :'<',
      onRemove : '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };

  return ddo;
}

function FoundItemsDirectiveLink(scope, element, attrs, controller) {
  scope.$watch('list.emptyList()', function (newValue, oldValue) {

    if (newValue === true) {
      displayCookieWarning();
    }
    else {
      removeCookieWarning();
    }

  });

  function displayCookieWarning() {
    var warningElem = element.find("div.error");
    warningElem.slideDown(900);
  }


  function removeCookieWarning() {
    var warningElem = element.find("div.error");
    warningElem.slideUp(900);
  }
}

function FoundItemsDirectiveController() {
  var list = this;
  list.emptyList = function(){
    if (list.found.length == 0) {
            return true;
    }
    return false;
  }
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchkey ="";
  menu.found=0;

  menu.logMenuItems = function(){
    var promise = MenuSearchService.getMenuItems();
    promise.then(function (response) {
      var resp= response.data;
      menu.items = resp.menu_items;

      menu.found = MenuSearchService.getMatchedMenuItems(menu.items,menu.searchkey);
    

    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  menu.removeItem = function(itemindex){
    MenuSearchService.removeItem(itemindex);
  };




}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var matched_items=[];
  service.getMenuItems=function(searchterm){
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });

    return response;
  };

  service.getMatchedMenuItems=function(items,searchterm){
    matched_items=[];
    console.log("searchterm"+searchterm);
    if(searchterm!=""){
      for (var i = 0; i < items.length; i++) {
        var desc = items[i].description;
        if (desc.indexOf(searchterm) !== -1) {
          matched_items.push(items[i]);
        }
      }
    }
    return matched_items;
  };

  service.removeItem =function(itemIndex){
      matched_items.splice(itemIndex, 1);
  };



};


})();
