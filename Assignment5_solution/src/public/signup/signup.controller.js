(function () {


angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject=['MyInfoService']
function SignUpController(MyInfoService) {
  var reg = this;
  reg.submit = function () {
    var res=MyInfoService.storeInfo(reg.user.firstname,reg.user.lastname,reg.user.email,reg.user.phone,reg.user.short_name);
    if(res==1){
      reg.completed=true;
    }


  };
}

})();
