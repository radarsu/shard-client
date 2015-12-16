(function () {
    'use strict';

    angular.module('shardClient').config(config);

    /** @ngInject */
    function config($sailsProvider, $logProvider, toastrConfig, $mdThemingProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Connect to sails
        $sailsProvider.url = 'http://localhost:1337';

        // Theming.
        $mdThemingProvider.definePalette('shardPrimaryPalette', {
            '50': 'rgba(27, 27, 27, 0.71)',
            '100': '#666666',
            '200': '#595959',
            '300': '#4d4d4d',
            '400': '#404040',
            '500': '#333',
            '600': '#262626',
            '700': '#1a1a1a',
            '800': '#0d0d0d',
            '900': '#000000',
            'A100': '#808080',
            'A200': '#8c8c8c',
            'A400': '#999999',
            'A700': '#000000',
            'contrastDefaultColor': 'dark',
            'contrastLightColors': ['50', '100', '200', '300', '400', 'A100']
        }).definePalette('shardAccentPalette', {
            '50': 'rgba(27, 27, 27, 0.71)',
            '100': '#666666',
            '200': '#595959',
            '300': '#4d4d4d',
            '400': '#404040',
            '500': '#333',
            '600': '#262626',
            '700': '#1a1a1a',
            '800': '#0d0d0d',
            '900': '#000000',
            'A100': '#808080',
            'A200': '#8c8c8c',
            'A400': '#999999',
            'A700': '#000000',
            'contrastDefaultColor': 'dark',
            'contrastLightColors': ['50', '100', '200', '300', '400', 'A100']
        }).definePalette('shardBackgroundPalette', {
            '50': 'rgba(27, 27, 27, 0.71)',
            '100': '#666666',
            '200': '#595959',
            '300': '#4d4d4d',
            '400': '#404040',
            '500': '#333',
            '600': '#262626',
            '700': '#1a1a1a',
            '800': '#0d0d0d',
            '900': '#000000',
            'A100': '#808080',
            'A200': '#8c8c8c',
            'A400': '#999999',
            'A700': '#000000',
            'contrastDefaultColor': 'dark',
            'contrastLightColors': ['50', '100', '200', '300', '400', 'A100']
        }).definePalette('shardWarnPalette', {
            '50': 'rgba(27, 27, 27, 0.71)',
            '100': '#666666',
            '200': '#595959',
            '300': '#4d4d4d',
            '400': '#404040',
            '500': '#333',
            '600': '#262626',
            '700': '#1a1a1a',
            '800': '#0d0d0d',
            '900': '#000000',
            'A100': '#808080',
            'A200': '#8c8c8c',
            'A400': '#999999',
            'A700': '#000000',
            'contrastDefaultColor': 'dark',
            'contrastLightColors': ['50', '100', '200', '300', '400', 'A100']
        }).theme('default').dark().primaryPalette('shardPrimaryPalette').accentPalette('shardAccentPalette').backgroundPalette('shardBackgroundPalette').warnPalette('shardWarnPalette');

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        // toastrConfig.preventDuplicates = true;
        // toastrConfig.progressBar = true;

    }

})();
