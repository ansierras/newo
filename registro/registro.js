'use strict';
 
angular.module('newoApp.registro', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('registro', {
	   url: '/registro',
	   templateUrl: 'registro/registro.html',
	   controller: 'registroCtrl'
	})
}])

.controller('registroCtrl', ['$scope','$rootScope','$timeout','CommonProp','ErrorHandler','$state','$firebaseAuth','$firebaseArray', function($scope, $rootScope, $timeout, CommonProp, ErrorHandler, $state, $firebaseAuth, $firebaseArray) {
	$rootScope.clase="loaded";
	$scope.newuser = {};
	var auth = $firebaseAuth();
	$scope.registrar = function(){
		if (!$scope.registerForm.$invalid){
			$rootScope.clase="loading";
			console.log($scope.newuser);
			auth.$createUserWithEmailAndPassword($scope.newuser.email, $scope.newuser.password)
                .then(function(firebaseUser) {
            	    var ref = firebase.database().ref('users');
            	    var list = $firebaseArray(ref);
            	    list.$loaded().then(function() {
            			list.$add({
            				'uid': firebaseUser.uid,
            				'primerNombre': $scope.newuser.nombre,
            				'apellidos': $scope.newuser.apellidos,
            				'email': $scope.newuser.email,
                            'estatus': 'inactivo'
            			}).then(function(createResult) { 
            				console.log(createResult)
            				console.log(createResult.key)
            				CommonProp.setUser(firebaseUser.uid);
            				$state.go('home');
            			});
            	    })
                }).catch(function(error){
                	console.log(error.code)
                	$rootScope.clase="loaded";
                	ErrorHandler.showError(error.code, 5000);
                })

		}else{
			console.log("susuario invalido")
			Materialize.toast('Debes llenar todos los campos. La contraseña debe contener al menos 8 caracteres.', 4000)
		}
	}

}]);