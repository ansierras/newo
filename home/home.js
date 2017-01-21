'use strict';
 
angular.module('newoApp.home', ['ui.router'])
 
// Declared route 
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('home', {
		url: '/home',
		views:{
			'': {
				templateUrl:'home/home.html',
				controller: 'homeCtrl'	},
			'columnaCentral@home':{
				templateUrl:'perfil/perfil2.html',
				controller: 'perfilCtrl'},
			'columnaDerecha@home':{
				template: 'derecha'},
			'columnaIzquierda@home': {
				templateUrl: 'menu/menu.html',
				controller:'menuCtrl'}
		}
	})

}])



.controller('homeCtrl', ['$scope','$state','$rootScope','CommonProp','$timeout' ,function($scope, $state, $rootScope, CommonProp, $timeout) {
	//$timeout(function(){$rootScope.clase='loaded';}, 2000);
	//$rootScope.clase="loaded";
	$rootScope.selecciones = ['','','','',''];
	if(CommonProp.getUser()==null){
		console.log("no user")
    	$state.go('login');
	}else{
		var userKey = CommonProp.getUser();
		// var ref = firebase.database().ref('users/'+userKey);
		// var obj = $firebaseObject(ref);
		// obj.$loaded().then(function(result){
		// 	$scope.user= result;
		// })
	}
}])

