(function () {
    'use strict';

    angular.module('shardClient').config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {

        var capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        var state = function (name, forceUrl) {
            $stateProvider.state(name, {
                url: forceUrl || ('/' + name),
                templateUrl: 'app/' + name + '/' + name + '.html',
                controller: capitalizeFirstLetter(name) + 'Controller',
                controllerAs: name
            });
        };

        // States.
        state("connect", "/");
        state("login");
        state("main");
        state("panel");
        state("game");

        $urlRouterProvider.otherwise('/');
    }

})();
