(function () {
    'use strict';

    angular.module('shardClient').directive('leaveOnClick', component);

    /** @ngInject */
    function component($animate) {

        return {
            scope: {
                'leaveOnClick': '&'
            },
            link: function (scope, element) {
                element.on('click', function () {
                    element.unbind('click');
                    $animate.leave(element).then(scope.leaveOnClick);
                });
            }
        };

    }

})();
