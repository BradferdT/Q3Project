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
          $state.go('play');
        }
      })
    }

    vm.register = function(){
      $http.post('/register', vm.username)
      .then(function(res){
        if(res.data == 'complete'){
          $state.go('play');
        }else{
          vm.error = true;
          vm.message = 'Username Taken'
        }

      })
    }

  }
