(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuyList = this;
  toBuyList.to_Buy = ShoppingListCheckOffService.getToBuyItemsList();
  toBuyList.buyItem =function(itemIndex){
    ShoppingListCheckOffService.removeItem(itemIndex);
    if(toBuyList.to_Buy.length == 0){
      toBuyList.message = "Everything is bought!!!";
    }
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBoughtList = this;
  alreadyBoughtList.bought = ShoppingListCheckOffService.getBoughtItemsList();
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Soda",
    quantity : "10"
  }];

  var boughtItems=[];

  service.getToBuyItemsList = function () {
    return toBuyItems;
  }

  service.getBoughtItemsList = function () {
    return boughtItems;
  }

  service.addItem = function(itemIndex){
      var item = {
        name : toBuyItems[itemIndex].name,
        quantity : toBuyItems[itemIndex].quantity
      };
      boughtItems.push(item);
  }

  service.removeItem = function(itemIndex){
    service.addItem(itemIndex);
    if(toBuyItems.length > 0){
      toBuyItems.splice(itemIndex, 1);
    }
  }

}

})();
