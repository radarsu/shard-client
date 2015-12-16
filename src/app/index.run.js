(function () {
    'use strict';

    angular.module('shardClient').run(runBlock);

    /** @ngInject */
    function runBlock($log, $location) {
        $location.path('/');
    }

})();
