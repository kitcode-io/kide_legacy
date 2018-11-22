var Fs = require("fs");
require("../../../vendor/angular-timeago/angular-timeago");
require("../project");
require("../commander");
require("./tree/fileTree");

module.exports = angular.module("plunker.component.sidebar", [
  "yaru22.angular-timeago",
  "ui.bootstrap",
  "plunker.project",
  "plunker.service.commander",
  "plunker.directive.fileTree"
])

.filter("slice", function () {
  return function (text, n) { return String(text).substring(0, n); };
})

.directive("plunkerSidebar", [ function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "components/sidebar/sidebar.html",
    controllerAs: "sidebar",
    controller: function (project) {
      this.tree = {root: project.root};
      this.project = project;
    }
  };
}]);
