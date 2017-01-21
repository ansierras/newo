'use strict';
 
angular.module('newoApp.miembro', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('detalleUsuario',{
		url:'/:id',
		views:{
			'': {
				templateUrl:'home/home.html',
				controller: 'homeCtrl'	},
			'columnaIzquierda@detalleUsuario': {
				templateUrl: 'menu/menu.html',
				controller:'menuCtrl'},
			'columnaCentral@detalleUsuario':{
				templateUrl: 'perfil/perfil2.html',
				controller: 'miembrosCtrl'}
		}
	})
}])
.controller('miembrosCtrl',['$scope','$rootScope','CommonProp','$state','$firebaseObject','$firebaseArray','$timeout','$location','$stateParams', function($scope, $rootScope, CommonProp, $state, $firebaseObject, $firebaseArray, $timeout, $location, $stateParams){
	$('ul.tabs').tabs();
	$scope.userid =  $stateParams.id;
	$scope.conexionHecha = false;
	$scope.solicitudEnviada = false;
	$scope.enviarClase = "";
	var myId = CommonProp.getMyId();
	var ref = firebase.database().ref('users/'+$scope.userid);
	var obj = $firebaseObject(ref);
	var cw = $('.cover-img-cont2').width();
	$('.perfil-img2').css({'left':(cw/2 - 60)+'px'});
	obj.$loaded().then(function(){
		$scope.user = obj;
		$scope.tipo = globalTipos[$scope.user.tipo];
		if ($scope.user.conexiones) {
			$scope.user.conexiones.forEach(function(entry){
				if (entry==myId) {
					$scope.conexionHecha = true;
				};
			})
		};
		if ($scope.user.solicitudes) {
			$scope.user.solicitudes.forEach(function(entry){
				if (entry==myId) {
					$scope.solicitudEnviada = true;
				};
			})
		};
		$rootScope.clase='loaded';
	})
	$scope.conectar = function(){
		if ($scope.user.solicitudes) {
			$scope.user.solicitudes.push(myId)
		}else{
			$scope.user.solicitudes = [myId];
		};
		obj.$save().then(function(ref) {
			Materialize.toast('Solicitud enviada', 3000);
			$scope.solicitudEnviada = true;
		}, function(error) {
		  console.log("Error:", error);
		});
	}
	$scope.enviarMensaje = function(){
		$scope.enviarClase = "disabled"
		if ($scope.mensaje == '') {
		}else{
			var refChats = firebase.database().ref('users/'+$scope.userid+'/chats');
			var listChats = $firebaseArray(refChats.orderByChild('destino').equalTo(myId));
			listChats.$loaded().then(function(result){
				console.log(result.length);
				if (result.length>0) {	//Ya hay chat abierto con esta persona
					var nuevoMensaje ={
						de: myId,
						mensaje: $scope.mensaje
					}
					var refRoom = firebase.database().ref('chatrooms/'+listChats[0].chatroomId+"/mensajes");
					var listRoom = $firebaseArray(refRoom);
					listRoom.$loaded().then(function(){
						listRoom.$add(nuevoMensaje).then(function(){
							$scope.mensaje = "";
							$scope.enviarClase = ""
							Materialize.toast("Mensaje Enviado!", 3000);
						})
					})
				}else{	//No hay chat abierto con esta persona
					crearChatRoom(myId, $scope.userid, $scope.mensaje, listChats);
					$scope.enviarClase = "";
				};
			})
		}
	}

	var crearChatRoom = function(origen, destino, elMensaje, refLista){
		var nuevoMensaje =[{
			de: origen,
			mensaje: elMensaje
		}]
		var nuevoChatroom={
			miembro1: origen,
			miembro2: destino,
			mensajes: nuevoMensaje
		}
		var refRooms = firebase.database().ref('chatrooms');
		var listRooms = $firebaseArray(refRooms);
		listRooms.$loaded().then(function(){
			listRooms.$add(nuevoChatroom).then(function(result){
				var newChatroomKey = result.key;
				var nuevoChat = { destino: myId, chatroomId: newChatroomKey};
				refLista.$add(nuevoChat).then(function(){
					nuevoChat.destino = $scope.userid;
					var refMyChats = firebase.database().ref('users/'+myId+'/chats');
					var listMyChats = $firebaseArray(refMyChats);
					listMyChats.$loaded().then(function(){
						listMyChats.$add(nuevoChat).then(function(){
							Materialize.toast("Mensaje Enviado!", 3000);
						})
					})
				})
			})
		})
	}
}])