(function () {
"use strict";

angular.module('common')
.service('MyInfoService', MyInfoService);

function MyInfoService() {
  var service = this;
  var users_info;
  service.getInfo=function(){
  
    return users_info;
  };
  service.storeInfo =function(fN,lN,Email,contact,dish){

    var temp={
      FirstName:fN,
      LastName:lN,
      MailId:Email,
      Phone:contact,
      FavoriteDish:dish
    };
    users_info=temp;
    return(1);

  };

}



})();
