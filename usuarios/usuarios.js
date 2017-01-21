'use strict';
 
angular.module('newoApp.usuarios', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('newo',{
		url:'/newo',
		views:{
			'': {
				templateUrl:'home/home.html',
				controller: 'homeCtrl'	},
			'columnaIzquierda@newo': {
				templateUrl: 'menu/menu.html',
				controller:'menuCtrl'},
			'columnaCentral@newo':{
				templateUrl: 'usuarios/usuarios.html',
				controller: 'usuariosCtrl'}
		}
	})
}])

.controller('usuariosCtrl',['$scope','$rootScope','CommonProp','$state','$firebaseArray','$timeout','$location', function($scope, $rootScope, CommonProp, $state, $firebaseArray, $timeout, $location){
	$rootScope.selecciones[2]="selected";
	$('ul.tabs').tabs();
	$scope.listaTipos = globalTipos;

	var ref = firebase.database().ref('users');
	var list = $firebaseArray(ref);
	list.$loaded().then(function(){
		$scope.listaUsuarios = list;
		$rootScope.clase='loaded';
	})

	$scope.goToUser = function(userId){
		console.log(userId);
		//$location.path('/newo/'+userId);
		$state.go('detalleUsuario', {id: userId})
	}

}])
    