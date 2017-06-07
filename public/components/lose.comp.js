angular.module('blackJack')
.component('loseComp', {
  templateUrl: '/views/lose.view.html',
  controller: controller
})

  controller.$inject = ['$state'];
function controller($state){
  const vm = this;
  vm.goBack = function(){
    $state.go('play');
  }
}
