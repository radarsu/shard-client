(function () {
    'use strict';

    angular.module('shardClient').controller('ConnectController', Controller);

    /** @ngInject */
    function Controller($log, localStorageService, $location, $window, $document, $timeout, $interval, $sails, $rootScope, shardCommon, browserSupport) {
        var vm = this;

        // Checking browser support.
        vm.ValidBrowser = browserSupport;
        if (!vm.ValidBrowser) {
            vm.Show = true;
            return;
        }

        // Variables
        $rootScope.title = "Shard - Offline";
        var reconnecting, reconnectTimeout, serverOfflineCheck;

        // Communicates.
        vm.Progress = "Trwa łączenie z serwerem...";
        vm.SubProgress = "";

        // View change animation finished.
        vm.onViewHide = function () {
            $location.path(shardCommon.location());
        };

        // View show animation finished.
        vm.onViewShow = function () {
            vm.Connected = $sails.isConnected();
            // Check connection.
            if (vm.Connected) {
                sailsConnected();
            } else {
                $sails.off("connect");
                $sails.on("connect", sailsConnected);
            }
        };

        // If sails is connected.
        var sailsConnected = function () {
            shardCommon.commonHandlersOff();
            shardCommon.commonHandlersOn();

            if (angular.isDefined(serverOfflineCheck)) {
                $timeout.cancel(serverOfflineCheck);
            }

            if (angular.isDefined(reconnectTimeout)) {
                $timeout.cancel(reconnectTimeout);
            }

            if (angular.isDefined(reconnecting)) {
                $interval.cancel(reconnecting);
            }

            $rootScope.title = "Shard - Online";

            vm.Progress = "Połączono z serwerem!";
            vm.SubProgress = "";
            vm.Connected = true;

            // Changing location by animation.
            shardCommon.locationSet('/login');
            vm.Show = false;
        };

        // On server not responding.
        serverOfflineCheck = $timeout(function () {
            if (!vm.Connected) {
                vm.Progress = "Serwer offline.";
                vm.SubProgress = "Strona automatycznie nawiąże połączenie, gdy tylko będzie to możliwe.";
                // Trying to reconnect.
                if (!angular.isObject($sails._raw) || !$sails._raw.io.reconnecting) {
                    reconnectTimeout = $timeout(function(){
                        reconnecting = $interval(function () {
                            $sails._connect();
                        }, 2000);
                    }, 5000);
                }
            }
        }, 5000);

        // Showing view
        angular.element($window.document).ready(function () {
            vm.Show = true;
        });
    }
})();
