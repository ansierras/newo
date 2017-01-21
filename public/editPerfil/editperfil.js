'use strict';
 
angular.module('newoApp.editperfil', ['ui.router'])
 
// Declared route 
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home.editperfil', {
	   url: '/editar-perfil',
	   views: {
			"columnaCentral@home": {
				templateUrl: "editPerfil/editperfil.html",
				controller: "editarPerfilCtrl"
			}
		}
	})
}])

.controller('editarPerfilCtrl', ['$scope','$rootScope','$timeout','CommonProp','ErrorHandler','$state','$firebaseArray' ,function($scope, $rootScope, $timeout, CommonProp,ErrorHandler,$state, $firebaseArray) {
	//import listaRedes from 'listas';
	//console.log(listaRedes)
	$rootScope.clase="loaded";
	$scope.subiendoFotos = false;
	$('ul.tabs').tabs();
	$('select').material_select();
	var cw = $('.noUserFoto').width();
	$('.noUserFoto').css({'height':cw+'px'});
	var coverWidth = $('#mediaHere2').width();
	$('#mediaHere2').css({'height':coverWidth/2.5+'px'});
	var ref = firebase.database().ref('users');
	var userUid = CommonProp.getUser();
	var list = $firebaseArray(ref.orderByChild('uid').equalTo(userUid));
	$scope.redes = globalRedes;
	$scope.contacto = globalContacto;
	list.$loaded().then(function(){
		$scope.user = list[0];
		for (var i=0; i < $scope.user.redes.length; i++) {
			for (var j=0; j < $scope.redes.length; j++) {
				if ($scope.user.redes[i].nombre == $scope.redes[j].nombre) {
					$scope.redes[j].valor = $scope.user.redes[i].valor;
				};
			}
		};
		for (var i=0; i < $scope.user.contacto.length; i++) {
			for (var j=0; j < $scope.contacto.length; j++) {
				if ($scope.user.redes[i].nombre == $scope.redes[j].nombre) {
					$scope.contacto[j].valor = $scope.user.contacto[i].valor;
				};
			}
		};
	});
	
	
	

	var guardarInfo = function(){
		$scope.user.sexo = $('#sexo').val();
		$scope.user.redes = [];
		$scope.user.contacto = [];
		for (var i=0; i < $scope.redes.length; i++) {
			if ($scope.redes[i].valor!='') {
				$scope.user.redes.push($scope.redes[i]);
			};
		};
		for (var i=0; i < $scope.contacto.length; i++) {
			if ($scope.contacto[i].valor!='') {
				$scope.user.contacto.push($scope.contacto[i]);
			};
		};
		list.$save(0).then(function(ref){
			Materialize.toast('Tus datos se han actualizado exitosamente.', 4000);
			$state.go('home');
		})
	}

	var subirCover = function(){
		if ($scope.fotoCover) {
			var storageRef = firebase.storage().ref();
			var uploadTask = storageRef.child('images/' + userUid + "cover").put($scope.fotoCover);
			uploadTask.on('state_changed', function(snapshot){
			}, function(error) {
				guardarInfo();
			}, function() {
				console.log('foto subida')
				var downloadURL = uploadTask.snapshot.downloadURL;
				$scope.user.fotoCoverUrl=downloadURL;
			  	guardarInfo();
			});
		}else{
			guardarInfo();
		};
	}

	$scope.guardarCambios = function(){
		console.log($scope.user);
		console.log($scope.fotoPerfil);
		console.log($scope.fotoCover);
		if (($scope.fotoPerfil && $scope.fotoPerfil.size > 1600000) || ($scope.fotoCover && $scope.fotoCover.size > 1600000)) {
			Materialize.toast('Las imágenes deben pesar menos de 1.6 MegaBytes.', 4000)
			Materialize.toast('Tus datos no se actualizaron.', 4000)
		}else{
			$scope.subiendoFotos = true;
			if ($scope.fotoPerfil) {
				var storageRef = firebase.storage().ref();
				var uploadTask = storageRef.child('images/' + userUid + "perfil").put($scope.fotoPerfil);
				uploadTask.on('state_changed', function(snapshot){
				  // Observe state change events such as progress, pause, and resume
				  // See below for more detail
				}, function(error) {
				  // Handle unsuccessful uploads
					subirCover();
				}, function() {
					console.log('foto subida')
				  // Handle successful uploads on complete
				  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
					var downloadURL = uploadTask.snapshot.downloadURL;
					$scope.user.fotoPerfilUrl=downloadURL;
				  	subirCover();
				});
			}else{
				subirCover();
			};
		}
		
	}
	$scope.guardarCambios2 = function(){
	}
}])