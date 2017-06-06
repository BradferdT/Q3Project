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
          vm.userMoney = res.data.moneyLeft;
          vm.userName = res.data.username;
          vm.hitButton = true;
          vm.standButton = true;
        }
      })
    }

    vm.bet25 = function(){
      var b = {betAmount: 25};
      $http.post('/task/bet', b)
      .then(function(res){
        console.log(res.data);
      })
    }

    vm.bet = function(){
      console.log('bet 50');
    }
  }
