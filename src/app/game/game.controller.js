(function () {
    'use strict';

    angular.module('shardClient').controller('GameController', Controller);

    /** @ngInject */
    function Controller($window, $sails, $log) {
        var vm = this;

        // *** Variables ***
        vm.leftTab = "chat";
        vm.Chat = {
            Text: "",
            Message: "",
            sendMessage: function (e) {
                var self = this;
                if (angular.isUndefined(e) || e.keyCode === 13) {
                    e.preventDefault();
                    $sails.post("/game/sendMessage", {
                        message: self.Message
                    });
                    self.Message = "";
                }
            }
        };

        // *** Functions ***
        vm.logOut = function () {
            $sails.post("/char/logout");
            $window.location.reload();
        };

        vm.isCharacter = function (x, y) {
            var mapCharacter = _.find(vm.Char.Location.Chars, function (character) {
                return character.Online && character.X === x && character.Y === y;
            });
            return mapCharacter;
        };

        // *** Watching ***

        // *** Events ***

        // Character data
        $sails.once("char", function (response) {
            $log.debug(response);
            vm.Char = response;
        });
        $sails.get("/char");

        // Location data
        $sails.once("location", function (response) {
            vm.Char.Location = response;
            vm.Char.Location.Width = new Array(vm.Char.Location.Width);
            vm.Char.Location.Height = new Array(vm.Char.Location.Height);
            _.each(vm.Char.Location.Chars, function (character){
                character.Avatar = $sails.url + character.Avatar;
            });
            $log.debug(vm.Char.Location);
        });
        $sails.get("/char/location");

        // Chat listening
        $sails.off("chat");
        $sails.on("chat", function (response){
            $log.debug(response);
            vm.Chat.Text += '<div class="shard-message message-' + response.author + '"> <span class="shard-date">[' + response.date + ']</span> <span class="shard-author author-' + response.author + '">' + response.author + '</span>: '+ response.message + '</div>';
        });

        // *** Showing View ***
        angular.element($window.document).ready(function () {
            vm.Show = true;
        });
    }
})();
