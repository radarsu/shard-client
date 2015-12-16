(function () {
    'use strict';

    angular.module('shardClient').factory('browserSupport', component);

    /** @ngInject */
    function component($window) {

        var support = false;

        (function () {
            var expectedSupport = "json svg localstorage xhrresponsetype audio canvas canvastext webgl inlinesvg xhrresponsetypejson svgasimg fontface flexbox flexwrap";
            var checkSupport = angular.element(angular.element($window.document.querySelector('html')))[0].className.trim();
            if (checkSupport.indexOf(expectedSupport) !== -1) {
                support = true;
            }
        })();

        return support;

    }
})();
