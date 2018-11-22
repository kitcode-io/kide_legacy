var angular = window.angular;

var Fs = require('fs');
var _ = require("lodash");


module.exports = angular.module("plunker.pane.preview", [
  "ui.bootstrap",
  require("../../project").name,
  require("../../commander").name,
  require("../../settings").name,
  require("../../urlState").name,
  require("../panes").name, 
  require("./previewer").name,
])

.run(["$rootScope", "panes", "project", "commander", "settings", function ($rootScope, panes, project, commander, settings) {
  
   commander.addCommand({
    name: "preview.open",
    description: "Open the preview window",
    handler: ["open", "workspace", openPreview],
    defaults: { open: true }
  });

  function openPreview (open, workspace) {
    var coords = workspace.getCoords('preview', 'preview');
    
    if (open === void 0) open = !coords;

    if (open) {
      if (!coords) {
        var layout = workspace.layout;
        var max = _.max(layout, function (col) { return col.length; });
        
        if (!coords && workspace.getActivePane().type === 'empty') {
          coords = workspace.getActivePaneCoords();
        } else if (_.max(max) === 1 || (layout.length <= layout[layout.length - 1].length)) {
          coords = workspace.split([layout.length - 1, layout[layout.length - 1].length - 1], true);
        } else {
          coords = workspace.split([layout.length - 1, layout[layout.length - 1].length - 1], false);
        }
        
        workspace.open(coords, "preview", "preview");
      }
    }
  }
  
  panes.registerHandler("preview", {
    template: Fs.readFileSync(__dirname + "/template.html", "utf8"),
  });
  
}])
   
.run(["$location", "workspace", "urlState", "commander", function ($location, workspace, urlState, commander) {   
  urlState.addState({
    name: "preview",
    decode: function () {
      return $location.search().p;
    },
    encode: function (open) {
      var search = $location.search();
      
      if (open) search.p = "y";
      else delete search.p;
      
      return $location.search(search);
    },
    read: function () {
      var coords = workspace.getCoords('preview', 'preview');
      
      return coords ? "y" : null;
    },
    write: function (open) {
      //return commander.execute("preview.toggle", {open: open === "y"});
    }
  });
}])

;
