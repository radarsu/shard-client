(function () {
    'use strict';

    angular.module('shardClient').controller('LoginController', Controller);

    /** @ngInject */
    function Controller($log, $location, $scope, localStorageService, $window, $timeout, $sails, shardCommon) {
        var vm = this;

        // *** Variables ***
        vm.Char = localStorageService.get("Char") || {
            Name: "",
            Password: "",
            RememberPassword: true
        };

        // *** Functions ***
        var moveCaretToEnd = function (el) {
            if (angular.isNumber(el.selectionStart)) {
                el.selectionStart = el.selectionEnd = el.value.length;
            } else if (angular.isUndefined(el.createTextRange)) {
                el.focus();
                var range = el.createTextRange();
                range.collapse(false);
                range.select();
            }
        };

        // *** View Functions ***
        vm.clearCache = function () {
            localStorageService.clearAll();
        };

        vm.onViewHide = shardCommon.onViewHide;

        // Log in
        vm.logIn = function (e) {
            if (angular.isUndefined(e) || e.keyCode === 13) {

                if (vm.Char.RememberPassword) {
                    localStorageService.set("Char", vm.Char);
                } else {
                    var rememberChar = _.clone(vm.Char);
                    rememberChar.Password = "";
                    localStorageService.set("Char", rememberChar);
                }

                $sails.post("/login", {
                    Name: vm.Char.Name,
                    Password: vm.Char.Password
                });
            }
        };

        // Register
        vm.register = function () {
            $sails.post("/login/create", {
                Name: vm.Char.Name,
                Password: vm.Char.Password
            });
        };

        // *** Events ***
        angular.element($window.document).ready(function () {
            var defaultInput = $window.document.getElementById('loginCharName');
            defaultInput.focus();
            moveCaretToEnd(defaultInput);
            $timeout(function(){
                vm.Show = true;
            }, 100);
        });

        // Location change
        $scope.$watch(function () {
            return shardCommon.location();
        }, function (value) {
            vm.Show = false;
        });
    }
})();
