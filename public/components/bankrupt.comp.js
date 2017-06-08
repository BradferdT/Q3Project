angular.module('blackJack')
.component('bankrupt', {
  templateUrl: 'views/bankrupt.view.html',
  controller: controller
})


  function controller($state){
    const vm = this;
    vm.goBack = function(){
      $state.go('register');
    }
  }
