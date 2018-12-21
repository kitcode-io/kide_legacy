var _ = require("lodash");

require("../components/commander");
require("../components/project");
require("../components/toolbar");
require("../components/sidebar");
require("../components/workspace");
require("../components/urlState");

module.exports = angular.module('plunker', [
        "ui.bootstrap",
        "fa.directive.borderLayout",
        "plunker.service.commander",
        "plunker.project",
        "plunker.component.toolbar",
        "plunker.component.sidebar",
        "plunker.component.workspace",
        "plunker.urlState",
    ])

    .config(["$locationProvider", function($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix("!");
    }])

    .config(["$tooltipProvider", function($tooltipProvider) {
        $tooltipProvider.options({
            appendToBody: true,
            popupDelay: 200,
        });
    }])

    .controller("EditorController", function($scope, $location, urlState, project) {

        urlState.addState({
            name: "plunkId",
            queue: "project",
            scope: $scope,
            decode: function() {
                return $location.path().slice(6);
            },
            encode: function(plunkId) {
                return $location.path("/edit/" + (plunkId || ""));
            },
            read: function() {
                return project.isSaved() ? project.plunk.id : void 0;
            },
            write: function(plunkId) {
                //return commander.execute("editor.reset");
            }
        });

    });
