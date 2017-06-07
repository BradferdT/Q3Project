angular.module('blackJack')
.component('tieComp', {
  templateUrl: 'views/tie.view.html',
  controller: controller
})

controller.$inject = ['$http', '$state','callService'];

function controller($http, $state, callService){
  const vm = this;
  vm.goBack = function(){
    var bet = callService.getProperty()
    $http.post('/task/tie', {bet: bet})
    .then(function(){
      $state.go('play');
    })
  }
}
