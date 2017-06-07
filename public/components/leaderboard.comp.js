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
        console.log('in play');
        $http.get('/register/userDetails')
        .then(function(res){
          console.log(res.data);
          vm.showStats = true;
          vm.wins = res.data.wins;
          vm.losses = res.data.losses;
          vm.ties = res.data.ties;
        })
      }
      $http.get('/task/leaderboard')
      .then(function(res){
        vm.topPlayer = res.data[0].username;
        vm.secondPlayer = res.data[1].username;
        vm.thirdPlayer = res.data[2].username;
      })
    }
  }
