'use strict';
 
angular.module('newoApp.login', ['ui.router'])
 
// Declared route 
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
	   url: '/login',
	   templateUrl: 'login/login.html',
	   controller: 'loginCtrl'
	})
}])

.controller('loginCtrl', ['$scope','$rootScope','$timeout','CommonProp','ErrorHandler','$state','$firebaseAuth' ,function($scope, $rootScope, $timeout, CommonProp,ErrorHandler,$state, $firebaseAuth) {
	$rootScope.clase="loaded";
	var auth = $firebaseAuth();
	$scope.logIn = function() {
	    if (!$scope.loginForm.$invalid){
	    	$rootScope.clase="loaded.loading";
	    	auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser){
		    	console.log(firebaseUser.uid);
		    	CommonProp.setUser(firebaseUser.uid);
		    	$state.go('home');
		    }).catch(function(error){
		    	//$rootScope.clase="loaded";
		    	//login.loading = false;
		    	ErrorHandler.showError(error.code, 5000);
		    	$scope.error = error;
		    	console.log(error);
		    })
	    }else{
		   	Materialize.toast('Parece que no has llenado todos los campos.', 4000)
		}
	}
}])