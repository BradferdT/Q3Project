angular.module('blackJack')
.component('playComp',{
  templateUrl: 'views/play.view.html',
  controller: controller
})

  controller.$inject = ['$http', '$state']

  function controller($http, $state){
    const vm = this;

    vm.$onInit = function(){
      $http.get('/register/check')
      .then(function(res){
        if(!res.data.loggedIn){
          $state.go('register');
        }else{
          vm.hitButton = true;
          vm.standButton = true;
        }
      })
    }

    vm.bet25 = function(){
      $http.post('')
    }
  }
