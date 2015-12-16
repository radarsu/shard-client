(function () {
    'use strict';

    angular.module('shardClient').factory('shardCommon', component);

    /** @ngInject */
    function component($location, $log, $sails, toastr) {

        // CommonHandler Class
        var CommonHandler = function (object) {
            this.Name = object.Name;
            this.Fn = object.Fn;
            this.Active = false;
        };

        // CommonHandler Methods
        CommonHandler.prototype = {
            on: function () {
                var self = this;
                $sails.off(self.Name);
                $sails.on(self.Name, self.Fn);
                this.Active = true;
            },
            off: function () {
                var self = this;
                $sails.off(self.Name);
                this.Active = false;
            }
        };

        // CommonHandlers Data
        var location = "/";

        var commonHandlersData = [{
            Name: "toastr",
            Fn: function (data) {
                toastr[data.type](data.description, data.title);
            }
        }, {
            Name: "location",
            Fn: function (data) {
                location = data.path;
            }
        }, {
            Name: "error",
            Fn: function () {
                $location.path("/");
            }
        }];

        var commonHandlers = [];
        _.each(commonHandlersData, function (commonHandlerData) {
            commonHandlers.push(new CommonHandler(commonHandlerData));
        });

        // Service.
        var service = {
            // Handlers.
            activeHandlers: function () {
                return _.filter(commonHandlers, function (commonHandler) {
                    return commonHandler.Active;
                });
            },
            commonHandlersOn: function () {
                _.each(commonHandlers, function (commonHandler) {
                    commonHandler.on();
                });
            },
            commonHandlersOff: function () {
                _.each(commonHandlers, function (commonHandler) {
                    commonHandler.off();
                });
            },
            // Location.
            location: function () {
                return location;
            },
            locationSet: function (value) {
                if (angular.isString(value)) {
                    location = value;
                } else {
                    $log.debug("shardCommon: Invalid location value.");
                }
            },
            // OnViewHide.
            onViewHide: function () {
                $location.path(location);
            }
        };

        return service;

    }
})();
