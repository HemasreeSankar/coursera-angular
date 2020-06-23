(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService','information','ApiPath'];
function MyInfoController(MenuService,information,ApiPath) {
  var $ctrl = this;
  $ctrl.basePath=ApiPath;
  $ctrl.information=information;
  console.log($ctrl.information);

  if($ctrl.information==null){
    $ctrl.signupWarning = "Not Signed Up Yet. Sign up Now!";

  }
  else{
    MenuService.getMenu($ctrl.information.FavoriteDish)
      .then(function(data) {
        console.log("Dish found:", data);
        $ctrl.menuItem=data;
        console.log($ctrl.menuItem.description);
      },function(err){
        $ctrl.warning = "No such menu number exists";
      });
  }

};

})();
