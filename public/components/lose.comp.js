angular.module('blackJack')
.component('loseComp', {
  templateUrl: '/views/lose.view.html',
  controller: controller
})

  controller.$inject = ['$state', '$http'];
function controller($state, $http){
  const vm = this;
  vm.goBack = function(){
    $http.put('/task/loss')
    .then(function(){
      $state.go('play');
    })

  }
}
