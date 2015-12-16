(function () {
    'use strict';

    var directiveName = 'emptyDirective';
    angular.module('shardClient').directive(directiveName, component);

    /** @ngInject */
    function component() {}

})();
