'use strict';
 
angular.module('newoApp.preloader', [])

.controller('bodyCtrl',['$scope','$timeout','$rootScope',function($scope, $timeout, $rootScope){
	//$rootScope.clase = 'loaded';
	$scope.hola = 'mundo';
	//$timeout(function(){$rootScope.clase='loading';}, 2000);
}])