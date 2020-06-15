(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/template/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
