'use strict';
 
angular.module('newoApp.directives', [])
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    if (changeEvent.target.files.length == 1) {
                    	scope.fileread = changeEvent.target.files[0];
                    }else{
                    	scope.fileread = changeEvent.target.files;
                    };
                });
            });
        }
    }
}])

.directive('backImg', [function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        console.log(url)
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
}])