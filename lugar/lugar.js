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
	
	$scope.selectedSala = "";
	$('.modal').modal();
	var slider = document.getElementById('test5');
	  noUiSlider.create(slider, {
	   start: [8, 12],
	   connect: true,
	   step: 1,
	   range: {
	     'min': 7,
	     'max': 22
	   },
	   tooltips: true
	  });
	$scope.lugarid =  $stateParams.id;
	var ref = firebase.database().ref('lugares/'+$scope.lugarid);
	var obj = $firebaseObject(ref);
	var cw = $('.cover-img-cont2').width();
	$('.perfil-img-host').css({'left':(cw/2 - 60)+'px'});
	obj.$loaded().then(function(){
		$scope.lugar = obj;
		console.log($scope.lugar.salas)
		//$rootScope.clase='loaded';
		var refHost = firebase.database().ref('users');
		var list = $firebaseArray(refHost.orderByChild('uid').equalTo($scope.lugar.host));
		list.$loaded().then(function(){
			$scope.host = list[0]
			$rootScope.clase='loaded';
		})
	})

	$scope.openModal = function(nombre){
		$scope.selectedSala = nombre;
		$('#modal1').modal('open');
	}

	$scope.pedirReserva = function(){
		console.log($scope.fechaElegida)
		var refReq = firebase.database().ref('requests');
		var listRequests = $firebaseArray(refReq);
		listRequests.$loaded().then(function(){
			if ($scope.fechaElegida) {
				listRequests.$add({
					'uid': CommonProp.getUser(),
					'lugar': $scope.lugar.nombre,
					'sala': $scope.selectedSala,
					'fecha': $scope.fechaElegida.toString(),
					'hora': slider.noUiSlider.get()
				}).then(function(createResult) { 
					$scope.selectedSala = "";
					$("#modal1").modal('close');
					Materialize.toast('Tu solicitud de reserva fue recibida con éxito. Pronto recibirás un email de confirmación.', 8000)
				}).catch(function(error){
			    	$scope.error = error;
			    	console.log(error);
			    });
			};
		})
	}
	
}]);


 