(function () {
    'use strict';

    angular.module('shardClient').controller('MainController', Controller);

    /** @ngInject */
    function Controller($scope, shardCommon, $sails, $window, $log, ngTableParams) {
        var vm = this;

        // *** Variables ***
        var date = new Date();
        var NgTableParams = ngTableParams;
        vm.Year = date.getFullYear() + 1337;
        vm.Chosen = {
            // Data
            Sex: undefined,
            Race: undefined,
            Age: 0,

            // Stats
            Stats: undefined,
            Description: ""
        };

        // *** Functions ***
        vm.onViewHide = shardCommon.onViewHide;

        vm.logOut = function () {
            $sails.post("/char/logout");
            $window.location.reload();
        };

        vm.raceUrl = function () {
            var url = "";
            if (angular.isDefined(vm.Chosen.Race) && angular.isDefined(vm.Chosen.Sex)) {
                url = "/assets/images/races/" + vm.Chosen.Race.ConfigName.toLowerCase() + vm.Chosen.Sex.ConfigName.toLowerCase() + ".png";
            }
            return url;
        };

        var setDefaultAge = function () {
            vm.Chosen.Age = parseInt((vm.Chosen.Race.MinAge + vm.Chosen.Race.MaxAge) * (1 / 3));
        };

        var recalcStats = function () {
            if (angular.isDefined(vm.Chosen.Sex) && angular.isDefined(vm.Chosen.Race) && angular.isNumber(vm.Chosen.Age) && vm.Chosen.Age > 0) {
                console.log(vm.Chosen);
                _.each(vm.StatSchemes, function (statscheme) {
                    var currentStat = _.find(vm.Chosen.Stats, function (stat) {
                        return stat.Scheme.Name === statscheme.Name;
                    });
                    currentStat.Value = vm.Chosen.Race[vm.Chosen.Sex.ConfigName + statscheme.Name];
                });

                if (vm.Chosen.Age > vm.Chosen.Race.OldAge) {
                    var STR = _.find(vm.Chosen.Stats, function (stat) {
                        return stat.Scheme.Name === "STR";
                    });
                    STR.Value -= 10;
                    var AGI = _.find(vm.Chosen.Stats, function (stat) {
                        return stat.Scheme.Name === "AGI";
                    });
                    AGI.Value -= 10;
                    var INT = _.find(vm.Chosen.Stats, function (stat) {
                        return stat.Scheme.Name === "INT";
                    });
                    INT.Value += 20;
                }
                /*
                $sails.once("statCosts", function (response) {

                });
                $sails.get("/main/statCosts/");
                */
            }
        };

        vm.changedSex = function () {
            recalcStats();
        };

        vm.changedRace = function () {
            setDefaultAge();
            recalcStats();
        };

        vm.changedAge = function () {
            recalcStats();
        };

        vm.createChar = function () {
            vm.createButtonDisabled = true;
            $sails.post("/main/create", vm.Chosen).error(function(){
                vm.createButtonDisabled = false;
            });
        };

        // *** Events ***

        // Configuration.
        $sails.once("config", function (response) {

            // Sexes to choose
            vm.Sexes = response.Sexes;

            // Races to choose
            vm.Races = _.sortBy(response.Races, function (race) {
                return race.Popularity;
            });

            // StatSchemes
            vm.StatSchemes = response.StatSchemes;

        });
        $sails.get("/main/config");

        // Character data.
        $sails.once("char", function (character) {
            vm.Char = character;
        });
        $sails.get("/char");

        // Stats.
        $sails.once("stats", function (stats) {
            console.log(stats);
            vm.Chosen.Stats = stats;
            $log.debug(stats);
            vm.statsTable = new NgTableParams({
                count: 3
            }, {
                data: vm.Chosen.Stats,
                counts: []
            });
        });
        $sails.get("/char/stats");

        // Location change
        $scope.$watch(function () {
            return shardCommon.location();
        }, function (value) {
            vm.Show = false;
        });

        // Showing view
        angular.element($window.document).ready(function () {
            vm.Show = true;
        });

        return vm;
    }

})();
