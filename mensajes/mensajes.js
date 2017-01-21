'use strict';
 
angular.module('newoApp.inbox', ['ui.router'])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('inbox',{
		url:'/inbox',
		views:{
			'': {
				templateUrl:'home/home.html',
				controller: 'homeCtrl'	},
			'columnaIzquierda@inbox': {
				templateUrl: 'menu/menu.html',
				controller:'menuCtrl'},
			'columnaCentral@inbox':{
				templateUrl: 'mensajes/mensajes.html',
				controller: 'mensajesCtrl'}
		}
	})
}])

.controller('mensajesCtrl',['$scope','$rootScope','CommonProp','$state','$firebaseObject', '$firebaseArray', function($scope, $rootScope, CommonProp, $state, $firebaseObject, $firebaseArray){
	$('ul.tabs').tabs();
	$rootScope.selecciones[1]="selected";
	$rootScope.clase='loaded';
	$scope.chatrooms = [];
	$scope.chatroomClases = [];
	$scope.mensajes = [];
	$scope.enviarClase = "";
	var cw = $('.perfil-cont').height();
	$('#listaDestinos').css({'height':cw-48+'px'});
	var myId = CommonProp.getMyId();
	var ref = firebase.database().ref('users/'+myId);
	var obj = $firebaseObject(ref);
	obj.$loaded().then(function(){
		$.each(obj.chats, function(i){
			$scope.chatroomClases[i] = "";
		    armarChatroom(obj.chats[i]);
		});
		
	})

	var armarChatroom = function(objChat){
		var ref = firebase.database().ref('users/'+objChat.destino);
		var obj = $firebaseObject(ref);
		obj.$loaded().then(function(){
			var newChatroom = {
				avatar: obj.fotoPerfilUrl,
				nombre: obj.primerNombre + " " + obj.apellidos,
				vinculo: obj.empresa,
				chatroomId: objChat.chatroomId
			}
			$scope.chatrooms.push(newChatroom);
			if ($scope.chatrooms.length==1) {
				$scope.abrirChatroom($scope.chatrooms[0].chatroomId, 0);
			};
		})
	}

	$scope.abrirChatroom = function(chatroomId, index){
		$scope.chatroomClases = [];
		$scope.chatroomClases[index]="selected";
		$scope.selectedChatroom = chatroomId;
		var refMes = firebase.database().ref('chatrooms/'+chatroomId+"/mensajes").limitToLast(100);
		var listMes = $firebaseArray(refMes);
		listMes.$loaded().then(function(){
			$scope.mensajes = listMes;
		})
	}

	$scope.enviarMensaje = function(){
		$scope.enviarClase = "disabled";
		if($scope.nuevoMensaje != ""){
			var refNewMes = firebase.database().ref('chatrooms/'+$scope.selectedChatroom+"/mensajes");
			var	listNewMes = $firebaseArray(refNewMes);
			listNewMes.$loaded().then(function(){
				var nuevoMensaje = {
					de: myId,
					mensaje: $scope.nuevoMensaje
				}
				listNewMes.$add(nuevoMensaje).then(function(){
					$scope.nuevoMensaje = "";
					$scope.enviarClase = ""
				})
			})
		}
	}

	$scope.myFunct = function(keyEvent) {
		if (keyEvent.which === 13)
			$scope.enviarMensaje();
	}

	$scope.getClass = function(senderId){
		if (senderId==myId) {
			return 'miMensaje col l8 offset-l4 right-align';
		}else{
			return 'suMensaje col l8';
		};
	}
}])