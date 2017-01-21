'use strict';
var newoApp = angular.module('newoApp', [
    'ui.router',
    'firebase',
    'angular-media-preview',
    'newoApp.home',
    'newoApp.inbox',
    'newoApp.login',
    'newoApp.services',
    'newoApp.preloader',
    'newoApp.menu',
    'newoApp.perfil',
    'newoApp.registro',
    'newoApp.usuarios',
    'newoApp.editperfil',
    'newoApp.directives',
    'newoApp.reservas',
    'newoApp.miembro']);

newoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    // $stateProvider
        
    //     // HOME STATES AND NESTED VIEWS ========================================
    //     .state('home', {
    //         url: '/home',
    //         templateUrl: 'home/home.html'
    //     })
        
    //     // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    //     .state('about', {
    //         // we'll get to this in a bit       
    //     });
        
});

