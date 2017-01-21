'use strict';
 
angular.module('newoApp.lugar', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('lugar',{
		url:'/lugar/:id',
		views:{
			'': {
				templateUrl:'home/home.html',
				controller: 'homeCtrl'	},
			'columnaIzquierda@lugar': {
				templateUrl: 'menu/menu.html',
				controller:'menuCtrl'},
			'columnaCentral@lugar':{
				templateUrl: 'lugar/lugar.html',
				controller: 'lugarCtrl'}
		}
	})
}])

.controller('lugarCtrl',['$scope','$rootScope','CommonProp','$state','$firebaseObject','$firebaseArray','$timeout','$location','$stateParams', function($scope, $rootScope, CommonProp, $state, $firebaseObject, $firebaseArray, $timeout, $location, $stateParams){
	$scope.lugarid =  $stateParams.id;
	var ref = firebase.database().ref('lugares/'+$scope.lugarid);
	var obj = $firebaseObject(ref);
	var cw = $('.cover-img-cont2').width();
	$('.perfil-img-host').css({'left':(cw/2 - 60)+'px'});
	obj.$loaded().then(function(){
		$scope.lugar = obj;
		//$rootScope.clase='loaded';
		var refHost = firebase.database().ref('users');
		var list = $firebaseArray(refHost.orderByChild('uid').equalTo($scope.lugar.host));
		list.$loaded().then(function(){
			$scope.host = list[0]
			$rootScope.clase='loaded';
		})
	})
	
}]);


 