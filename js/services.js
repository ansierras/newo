
'use strict';
 
angular.module('newoApp.services', [])
.service('CommonProp',['$firebaseAuth',function($firebaseAuth) {
    var user = '';
    var myId = '';
    var photo = '';
    return {
        getUser: function() {
        	if(user==''){
        		user = localStorage.getItem("userKey"); //devuelve el UID, después hay que buscar en USERS.
        	}

            return user;
        },
        getMyId: function(){
            if(myId==''){
                myId = localStorage.getItem("myId"); //devuelve el UID, después hay que buscar en USERS.
            }
            return myId;
        },
        setUser: function(dbKey) {
        	localStorage.setItem("userKey", dbKey) //GUARDA EL UID del usuario. El que está en la authentication, no el de la base de datos
        	user = dbKey;
        },
        setMyId: function(userId){
            localStorage.setItem("myId", userId);
            myId = userId;
        },
        logoutUser: function(){
        	var authObj = $firebaseAuth();
        	authObj.$signOut();
        	user = '';
        	localStorage.removeItem('userKey');		
        }
    };
}])

.service('ErrorHandler',function(){
    return {
        showError: function(errorCode, tiempo) {
            switch(errorCode) {
                case 'auth/invalid-email':
                    Materialize.toast('Oops! ese email parece que no es válido.', tiempo);
                    break;
                case 'auth/email-already-in-use':
                    Materialize.toast('Oops! ese email parece que ya está siendo usado por otro usuario.', tiempo);
                    break;
                case 'auth/weak-password':
                    Materialize.toast('Debes escoger una contraseña más compleja.', tiempo);
                    break;
                case 'auth/user-not-found':
                    Materialize.toast('Oops! No encontramos ese email en la base de datos.', tiempo);
                    break;
                case 'auth/wrong-password':
                    Materialize.toast('Oops! La contraseña no es válida para ese email.', tiempo);
                    break;
                default:
                    Materialize.toast('Oops! Ocurrió un error. Vuelve a intentarlo, por favor.', tiempo);
                    break;
            }
        }
    }
})

.service('MenuHandler', function(){
    var selection = ['','','','',''];
    return{
        setSelection: function(selected){
            selection = ['','','','',''];
            selection[selected] = "selected"
        },
        getSelection: function(){
            return selection;
        }
    }
})