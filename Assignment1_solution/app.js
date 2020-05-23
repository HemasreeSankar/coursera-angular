(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.items = "";
    $scope.CheckIfTooMuch =function(){
      var totalItems = calculateNoOfItems($scope.items);
      if(totalItems == 0){
        $scope.message = "Please Enter Data";
      }
      else if(totalItems <= 3){
        $scope.message = "Enjoy";
        $scope.color = "red";
      }
      else{
        $scope.message = "Too Much";
      }
    }

    function calculateNoOfItems(itemList){
        var noOfItems = 0;
        var itemArray = itemList.split(",");
        for(var i=0 ;i < itemArray.length ;i++){
          if(itemArray[i].length != 0  && itemArray[i] != " "){
              noOfItems+=1;
          }
        }
        return noOfItems;
    }
}

})();
