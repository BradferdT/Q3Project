angular.module('blackJack')
.component('showDeck', {
  templateUrl: 'views/showDeck.view.html',
  controller: controller
})

  controller.$inject = ['$http', '$state'];

  function controller($http, $state){
    const vm = this;
    vm.$onInit = function(){
      $http.get('/task/deck')
      .then(function(res){
        vm.deck = res.data;
        vm.cardCount = res.data.length;
      })
    }
  }
