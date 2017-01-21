'use strict';
 
angular.module('newoApp.reservas', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('reservas',{
		url:'/reservas',
		views:{
			'': {
				templateUrl:'home/home.html',
				controller: 'homeCtrl'	},
			'columnaIzquierda@reservas': {
				templateUrl: 'menu/menu.html',
				controller:'menuCtrl'},
			'columnaCentral@reservas':{
				templateUrl: 'reservas/reservas.html',
				controller: 'reservasCtrl'}
		}
	})
}])

.controller('reservasCtrl',['$scope','$rootScope','CommonProp','$state','$firebaseArray','$timeout', function($scope, $rootScope, CommonProp, $state, $firebaseArray, $timeout){
	$rootScope.clase="loaded";
	$scope.disponible = false;
	$('ul.tabs').tabs();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});
	$( ".datepicker" ).change(function() {
		$scope.disponibilidad();
	});
	
	$scope.disponibilidad = function(){
		console.log('in')
		$scope.$apply(function(){
            $scope.disponible = true;
        });
	}

	$scope.reservar = function(){
		console.log("date" ,$('.datepicker').val())
	}
}]);