'use strict';
 
angular.module('newoApp.menu', ['ui.router'])



.controller('menuCtrl',['$scope','$rootScope','CommonProp','MenuHandler','$state', function($scope, $rootScope, CommonProp,MenuHandler, $state){
	$scope.selecciones = MenuHandler.getSelection();
	$scope.menuClick = function(index, state){
		MenuHandler.setSelection(index);
		$state.go(state);
	}
	$scope.logOut = function(){
		$rootScope.clase = 'loading';
		//$timeout(function(){$rootScope.clase='loaded';}, 2000);
		CommonProp.logoutUser();
		$state.go('login');
	}
}])