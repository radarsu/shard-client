(function () {
    'use strict';

    var directiveName = 'shardShow';
    angular.module('shardClient').directive(directiveName, component);

    /** @ngInject */
    function component($animate) {

        return {
            scope: {
                'shardShow': '=',
                'afterShow': '&',
                'afterHide': '&'
            },
            link: function (scope, element) {
                $animate.addClass(element, 'ng-hide');
                scope.$watch(directiveName, function (value) {
                    if (value === true) {
                        $animate.removeClass(element, 'ng-hide').then(scope.afterShow);
                    } else if (value === false) {
                        $animate.addClass(element, 'ng-hide').then(scope.afterHide);
                    }
                });
            }
        };
    }

})();
