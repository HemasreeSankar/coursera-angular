(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['information','menuItems'];
function MyInfoController(information,menuItems) {
  var $ctrl = this;
  
  $ctrl.information=information;


  if($ctrl.information==null){
    $ctrl.signupWarning = "Not Signed Up Yet. Sign up Now!";

  }
  else{

      $ctrl.menuItems= menuItems.menu_items;
      if($ctrl.menuItems.length == 0){
        $ctrl.warning = "No such menu number exists";
      }
  }




}


})();
