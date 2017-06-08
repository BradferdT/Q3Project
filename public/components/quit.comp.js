angular.module('blackJack')
.component('quitComp', {
  templateUrl: 'views/quit.view.html',
  controller: controller
})

  controller.$inject = ['$http', '$state'];

  function controller($http, $state){
    const vm = this;
    vm.quit = function(){
      $http.delete('/task/quit')
      .then(function(){
        $state.go('register');
      })
    }
    vm.goBack = function(){
      $state.go('play');
    }
  }
