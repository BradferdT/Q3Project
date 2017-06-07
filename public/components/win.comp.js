angular.module('blackJack')
.component('winComp', {
  templateUrl: 'views/win.view.html',
  controller: controller
})

  controller.$inject = ['$http','callService']

function controller($http, callService){
  const vm = this;
  var x = callService.getProperty();
  console.log(x);
}
