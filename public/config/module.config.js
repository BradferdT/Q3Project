const app = angular.module('blackJack', ['ui.router', 'ngMaterial', 'ngAnimate']);

app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state({
    name: 'register',
    url: '/',
    component: 'registerComp'
  })
  .state({
    name: 'play',
    url: '/play',
    component: 'playComp'
  })
  .state({
    name: 'leaderboard',
    url: '/leaderboard',
    component: 'leaderboardComp'
  })
  .state({
    name: 'win',
    url: '/win',
    component: 'winComp'
  })
  .state({
    name: 'lose',
    url: '/lose',
    component: 'loseComp'
  })
  .state({
    name: 'tie',
    url: '/tie',
    component: 'tieComp'
  })
}
