angular.module('blackJack')
.component('registerComp', {
  templateUrl: 'views/register.view.html',
  controller: controller
})

  controller.$inject = ['$http', '$state'];

  function controller($http, $state){
    const vm = this;

    vm.$onInit = function(){
      $http.get('/register/check')
      .then(function(res){
        if(res.data.loggedIn){
          console.log('logged in');
          $state.go('play');
        }
      })
    }

    vm.register = function(){
      console.log(vm.username);
      $http.post('/register', vm.username)
      .then(function(res){
        $state.go('play');
      })
    }

  }
