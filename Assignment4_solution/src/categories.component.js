(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/template/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
