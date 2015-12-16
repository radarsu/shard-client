(function () {
    'use strict';

    angular.module('shardClient').controller('PanelController', Controller);

    /** @ngInject */
    function Controller($scope, shardCommon, $sails, $window, $log, ngTableParams, $timeout, Upload) {
        var vm = this;

        // *** Variables ***
        var date = new Date();
        var NgTableParams = ngTableParams;
        vm.Year = date.getFullYear() + 1337;
        vm.Char = {};

        // *** Functions ***
        vm.onViewHide = shardCommon.onViewHide;

        vm.logOut = function () {
            $sails.post("/char/logout");
            $window.location.reload();
        };

        vm.startGame = function () {
            $sails.post("/panel/start");
        };

        // Uploading avatar
        vm.uploadFiles = function (file, errFiles) {
            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/panel/uploadAvatar',
                    data: {
                        file: file
                    }
                });
            }
        };

        // Changing character description
        vm.setDescription = function () {
            $sails.post("/panel/setDescription", {
                description: vm.Char.Description
            });
        };

        // *** Watching ***
        // Location change
        $scope.$watch(function () {
            return shardCommon.location();
        }, function (value) {
            vm.Show = false;
        });

        // *** Events ***
        // Character data
        $sails.once("char", function (character) {
            vm.Char = character;
            vm.avatarUrl = $sails.url + vm.Char.Avatar;
        });
        $sails.get("/char");

        // Stats data
        $sails.once("stats", function (stats) {
            vm.Char.Stats = stats;
            vm.statsTable = new NgTableParams({
                count: 3
            }, {
                data: vm.Char.Stats,
                counts: []
            });
        });
        $sails.get("/char/stats");

        // Costs of statistics
        $sails.once("statCosts", function (statCosts) {
            var statByName = function (stat){
                return stat.Scheme.Name === statName;
            };

            for (var statName in statCosts) {
                var statCost = statCosts[statName];
                var currentStat = _.find(vm.Char.Stats, statByName);
                currentStat.Cost = statCost;
            }
        });
        $sails.get("/panel/statCosts");

        // On avatar uploaded
        $sails.off("avatarUploaded");
        $sails.on("avatarUploaded", function () {
            vm.avatarUrl = $sails.url + vm.Char.Avatar + "?" + new Date().getTime();
        });

        // Showing view
        angular.element($window.document).ready(function () {
            $timeout(function(){
                vm.Show = true;
            });
        });
    }

})();
