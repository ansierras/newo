angular.module('newoApp.perfil', ['ui.router'])

.controller('perfilCtrl',['$scope','$rootScope','CommonProp','MenuHandler','$state','$firebaseArray','$firebaseObject','$timeout','$window', function($scope, $rootScope, CommonProp, MenuHandler, $state, $firebaseArray, $firebaseObject, $timeout, $window){
	//MenuHandler.setSelection(0);
	$rootScope.selecciones[0] = "selected"
	$('ul.tabs').tabs();
	$('.modal').modal();
	$scope.miPerfil = true;
	$scope.mensajeInput = false;
	$scope.listaTipos = globalTipos;
	$scope.userUid = CommonProp.getUser();
	var ref = firebase.database().ref('users');
	var list = $firebaseArray(ref.orderByChild('uid').equalTo($scope.userUid));
	list.$loaded().then(function(){
		$scope.user = list[0]
		$scope.tipo = globalTipos[$scope.user.tipo];
		CommonProp.setMyId($scope.user.$id);
		$rootScope.clase='loaded';
	})
	var cw = $('.cover-img-cont2').width();
	$('.perfil-img2').css({'left':(cw/2 - 60)+'px'});
	var cw = $('.noUserFoto').width();
	$('.noUserFoto').css({'height':cw+'px'});
	var cw = $('.perfil-img').width();
	$('.perfil-img').css({'height':cw+'px'});
	$scope.redClick = function(link){
		$window.open("https://"+link, '_blank');
	}
	$scope.mostrarNotificaciones = function(){
		$('#modal1').modal('open');
		$scope.solicitudes = [];
		$scope.user.solicitudes.forEach(function(entry){
			var ref = firebase.database().ref('users/'+entry);
			var obj = $firebaseObject(ref);
			obj.$loaded().then(function(result){
				$scope.solicitudes.push(result);
			})
		})
	}
	$scope.abrirMensaje = function(){

	}
	$scope.aceptarSolicitud = function(target){

		if (target.conexiones) {
			target.conexiones.push($scope.user.$id);
		}else{
			target.conexiones = [$scope.user.$id];
		};

		if ($scope.user.conexiones) {
			$scope.user.conexiones.push(target.$id);
		}else{
			$scope.user.conexiones = [target.$id];
		};	
		target.$save().then(function(){
			$.each($scope.user.solicitudes, function(i){
			    if($scope.user.solicitudes[i] === target.$id) {
			        $scope.user.solicitudes.splice(i,1);
			        return false;
			    }
			});
			list.$save(0).then(function(){
				$.each($scope.solicitudes, function(i){
				    if($scope.solicitudes[i].$id === target.$id) {
				        $scope.solicitudes.splice(i,1);
				        return false;
				    }
				});
				Materialize.toast('Conexión establecida!', 3000);
			})
		})
	}

}])
