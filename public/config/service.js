angular.module('blackJack')
.service('callService', service)

service.$inject = ['$http']

function service($http){
    var bet = 0;
        return {
            getProperty: function () {
                return bet;
            },
            setProperty: function(value) {
                bet = value;
                console.log(bet);
            }
  }
}
