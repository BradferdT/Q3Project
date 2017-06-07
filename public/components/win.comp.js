angular.module('blackJack')
.component('winComp', {
  templateUrl: 'views/win.view.html',
  controller: controller
})

  controller.$inject = ['$http','callService','$state', '$stateParams']

function controller($http, callService, $state, $stateParams){
  const vm = this;
  vm.$onInit = function(){
    var origBet = callService.getProperty();
    vm.winnings = (origBet * 2);
  }
  vm.collect = function(){
    $http.post('/task/win', {amount: vm.winnings})
  .then(function(){
    $state.go('play');
  })
  }
}
