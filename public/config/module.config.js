const app = angular.module('blackJack', ['ui.router', 'ngMaterial', 'ngAnimate'])

app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $locationProver){
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state({
    name: 'register',
    url: '/register',
    component: 'registerComp'
  })
  .state({
    name: 'play',
    url: '/play',
    component: 'playComp'
  })
}
