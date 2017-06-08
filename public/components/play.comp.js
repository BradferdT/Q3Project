angular.module('blackJack')
.component('playComp',{
  templateUrl: 'views/play.view.html',
  controller: controller
})

  controller.$inject = ['$http', '$state', 'callService']

  function controller($http, $state, callService){
    const vm = this;
    vm.$onInit = function(){
      $http.get('/register/check')
      .then(function(res){
        if(!res.data.loggedIn){
          $state.go('register');
        }else{
          vm.playerCards = [];
          vm.dealerCards = [];
          vm.playerTotal = 0;
          vm.dealerTotal = 0;
          vm.userMoney = res.data.moneyLeft;
          vm.userName = res.data.username;
          vm.hitButtonBool = true;
          vm.standButtonBool = true;
          if(vm.userMoney >= 100 && vm.userMoney >= 25){
            vm.bet25Bool = false;
            vm.bet50Bool = false;
            vm.bet100Bool = false;
          }else if(vm.userMoney < 100 && vm.userMoney >= 25 && vm.userMoney >= 50){
            vm.bet25Bool = false;
            vm.bet50Bool = false;
            vm.bet100Bool = true;
          }else if(vm.userMoney < 50 && vm.userMoney >= 25){
            vm.bet25Bool = false;
            vm.bet50Bool = true;
            vm.bet100Bool = true;
          }else if(vm.userMoney < 25){
            $http.delete('/task/delete')
            .then(function(){
              $state.go('bankrupt');
            })
          }
        }
      })
    }


    vm.bet25 = function(){
      var b = {betAmount: 25};
      callService.setProperty(25);
      $http.post('/task/bet', b)
      .then(function(res){
        vm.userMoney = res.data.moneyLeft;
        vm.bet25Bool = true;
        vm.bet50Bool = true;
        vm.bet100Bool = true;
        vm.hitButtonBool = false;
        vm.standButtonBool = false;
        vm.playerCards.push(res.data.c1);
        vm.playerCards.push(res.data.c3);
        vm.dealerCards.push(res.data.c2);
        vm.dealerCards.push(res.data.c4);
        placeCardsStart();
        getPlayerTotal();
        getDealerTotalStart();
        checkPlayerCondition();
      })
    }

    vm.bet50 = function(){
      var b = {betAmount: 50};
      callService.setProperty(50);
      $http.post('/task/bet', b)
      .then(function(res){
        vm.userMoney = res.data.moneyLeft;
        vm.bet25Bool = true;
        vm.bet50Bool = true;
        vm.bet100Bool = true;
        vm.hitButtonBool = false;
        vm.standButtonBool = false;
        vm.playerCards.push(res.data.c1);
        vm.playerCards.push(res.data.c3);
        vm.dealerCards.push(res.data.c2);
        vm.dealerCards.push(res.data.c4);
        placeCardsStart();
        getPlayerTotal();
        getDealerTotalStart();
        checkPlayerCondition()
      })
    }

    vm.bet100 = function(){
      var b = {betAmount: 100};
      callService.setProperty(100);
      $http.post('/task/bet', b)
      .then(function(res){
        vm.userMoney = res.data.moneyLeft;
        vm.bet25Bool = true;
        vm.bet50Bool = true;
        vm.bet100Bool = true;
        vm.hitButtonBool = false;
        vm.standButtonBool = false;
        vm.playerCards.push(res.data.c1);
        vm.playerCards.push(res.data.c3);
        vm.dealerCards.push(res.data.c2);
        vm.dealerCards.push(res.data.c4);
        placeCardsStart();
        getPlayerTotal();
        getDealerTotalStart();
        checkPlayerCondition();
      })
    }

    vm.hit = function(){
      $http.get('/task/hit')
      .then(function(res){
        vm.playerCards.push(res.data.newCard);
        getPlayerTotal();
        placeHitCard();
        checkAceValChanger(vm.playerCards, vm.playerTotal, 'player');
        checkPlayerCondition();
      })
    }

    vm.stand = function(){
      vm.dealerTotal = 0;
      angular.element(document.querySelector('.dealerCardImages img:last-child')).remove();
      angular.element(document.querySelector('.dealerCardImages')).append(`
        <img src="${vm.dealerCards[vm.dealerCards.length - 1].img}" class="cardStyle2">`)
      getDealerTotal();
      if(vm.dealerTotal <= 16){
        $http.get('/task/stand')
        .then(function(res){
          for(var j = 0; j < res.data.length; j++){
            if(vm.dealerTotal < 17){
              vm.dealerTotal += res.data[j].val;
              vm.dealerCards.push(res.data[j]);
              placeStandCard();
            }
            if(vm.dealerTotal > 17){
              checkAceValChanger(vm.dealerCards, vm.dealerTotal, 'dealer');
            }
          }
          checkAceValChanger(vm.dealerCards, vm.dealerTotal, 'dealer');
          checkStandCondition();
        })
      }else{
        checkAceValChanger(vm.dealerCards, vm.dealerTotal, 'dealer');
        checkStandCondition();
      }
    }


    function getPlayerTotal(){
      vm.playerTotal = 0;
      for(var i = 0; i < vm.playerCards.length; i++){
        vm.playerTotal += vm.playerCards[i].val;
      }
    }

    function getDealerTotalStart(){
      vm.dealerTotal += vm.dealerCards[0].val;
    }

    function getDealerTotal(){
      vm.dealerTotal = 0;
      for(var i = 0; i < vm.dealerCards.length; i++){
        vm.dealerTotal += vm.dealerCards[i].val;
      }
    }

    function placeHitCard(){
      angular.element(document.querySelector('.playerCardImages')).append(`<img src="${vm.playerCards[vm.playerCards.length - 1].img}" class="cardStyle2">`)
    }

    function placeStandCard(){
      angular.element(document.querySelector('.dealerCardImages')).append(`<img src="${vm.dealerCards[vm.dealerCards.length - 1].img}" class="cardStyle2">`)
    }


    function placeCardsStart(){
      for(var i = 0; i < vm.dealerCards.length; i++){
        if(i == 0){
          angular.element(document.querySelector('.dealerCardImages')).append(`<img src="${vm.dealerCards[i].img}" class="cardStyle">`)
        }else{
          angular.element(document.querySelector('.dealerCardImages')).append(`<img src="images/red_joker.png" class="cardStyle2">`)
        }
      }
      for(var i = 0; i < vm.playerCards.length; i++){
        if(i == 0){
          angular.element(document.querySelector('.playerCardImages')).append(`<img src="${vm.playerCards[i].img}" class="cardStyle">`)
        }else{
          angular.element(document.querySelector('.playerCardImages')).append(`<img src="${vm.playerCards[i].img}" class="cardStyle2">`)
        }
      }
    }

    function checkAceValChanger(who, total, string){
      if(total > 21){
        for(var i = 0; i < who.length; i++){
          if(who[i].val == 11){
            who[i].val = 1;
            break;
          }
      }
      if(string == 'dealer'){
        getDealerTotal();
      }else if(string == 'player'){
        getPlayerTotal();
      }
    }
    getPlayerTotal();
  }

    function checkPlayerCondition(){
      if(vm.playerTotal == 21){
        setTimeout(vm.stand, 600);
        //vm.stand();
      }else if(vm.playerTotal > 21){
          vm.hitButtonBool = true;
          vm.standButtonBool = true;
          setTimeout(lose, 2000);
      }
    }

    function checkStandCondition(){
      vm.standButtonBool = true;
      vm.hitButtonBool = true;
      if(vm.dealerTotal > 21){
          setTimeout(win, 2000);
      }else if(vm.dealerTotal == vm.playerTotal){
          setTimeout(tie, 2000)
      }else if(vm.dealerTotal < vm.playerTotal){
          setTimeout(win, 2000);
      }else if(vm.dealerTotal > vm.playerTotal){
          setTimeout(lose, 2000);
      }else{
        console.log('falsy');
      }
    }


    function win(){
      $state.go('win');
    }

    function lose(){
      $state.go('lose')
    }

    function tie(){
      $state.go('tie');
    }

  }
