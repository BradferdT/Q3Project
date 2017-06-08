angular.module('blackJack')
.component('leaderboardComp', {
  templateUrl: 'views/leaderboard.view.html',
  controller: controller
})

  controller.$inject = ['$http', '$state', '$stateParams'];

  function controller($http, $state, $stateParams){
    const vm = this;
    vm.$onInit = function(){
      vm.showStats = false;
      if($state.current.name == 'play'){
        $http.get('/register/userDetails')
        .then(function(res){
          vm.showStats = true;
          vm.wins = res.data.wins;
          vm.losses = res.data.losses;
          vm.ties = res.data.ties;
          vm.money = res.data.money;
          vm.username = res.data.username
          $http.get('/task/leaderboard')
          .then(function(res){
            vm.topPlayer = res.data[0].username;
            vm.secondPlayer = res.data[1].username;
            vm.thirdPlayer = res.data[2].username;
            vm.progress = ((vm.money / res.data[2].money) * 100);
            vm.totalBets = (vm.wins + vm.losses + vm.ties);
            vm.difference = (vm.money - 500);
            for(var i = 0; i < res.data.length; i++){
              if(res.data[i].username == vm.username){
                vm.showOnLeaderboard = true;
              }
            }
            if(!vm.showOnLeaderboard){
              vm.showRequiredForLeaderboard = true;
              vm.required = (res.data[2].money - vm.money);
            }
            if(vm.difference > 0){
              vm.showUp = true;
              vm.up = vm.difference;
            }else{
              vm.showDown = true;
              vm.down = vm.difference;
            }
          })
        })
      }
    }
    vm.quit = function(){
      $state.go('quit');
    }
  }
