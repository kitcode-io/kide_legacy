var Fs = require("fs");
var _ = require("lodash");

require("../components/commander");
require("../components/notifier");
require("../components/project");
require("../components/toolbar");
require("../components/sidebar");
require("../components/overlayer");
require("../components/workspace");
require("../components/urlState");
require("../components/userPane");
require("../components/commentsPane");

module.exports = angular.module('plunker', [
  "ui.bootstrap",
  "fa.directive.borderLayout",
  "plunker.service.commander",
  "plunker.service.notifier",
  "plunker.project",
  "plunker.component.toolbar",
  "plunker.component.sidebar",
  "plunker.component.overlayer",
  "plunker.component.workspace",
  "plunker.urlState",
  "plunker.component.userPane",
  "plunker.commentsPane"
])

.config(["$locationProvider", function($locationProvider){
  $locationProvider.html5Mode(true).hashPrefix("!");
}])

.config(["$tooltipProvider", function($tooltipProvider){
  $tooltipProvider.options({
    appendToBody: true,
    popupDelay: 200,
  });
}])


.run(["$rootScope", "notifier", "config", function ($rootScope, notifier, config) {
  //var success = function (message) { return function () { notifier.success(message); }; };
  //var error = function (message) { return function () { notifier.error(message); }; };
  
  //$rootScope.$on("project.save.success", success("Project saved"));
  //$rootScope.$on("project.fork.success", success("Project forked"));
  //$rootScope.$on("project.open.success", success("Project opened"));
  //$rootScope.$on("project.destroy.success", success("Project destroyed"));
  //$rootScope.$on("project.openTree.success", success("File tree loaded"));
  
  //$rootScope.$on("project.save.error", error("Failed to save project"));
  //$rootScope.$on("project.fork.error", error("Failed to fork project"));
  //$rootScope.$on("project.open.error", success("Failed to open project"));
  //$rootScope.$on("project.destroy.error", error("Failed to destroy project"));
  //$rootScope.$on("project.openTree.error", error("Failed to open tree"));

    //function receiveMessage(e) {
      //alert(JSON.stringify(e.data));
    //}

    //window.addEventListener( "message", receiveMessage);
    //setTimeout(function () {

      //var receiver = document.getElementById("plunkerPreviewIframe").contentWindow;
      //receiver.postMessage("Hello There!", config.url.run); 
    //}, 2000);
}])

.controller("EditorController", ["$scope", "$location", "urlState", "commander", "project", "notifier", function ($scope, $location, urlState, commander, project, notifier) {


  commander.addCommand({
    name: "editor.reset",
    handler: function () {
      return commander.execute("project.reset").then(function () {
	return commander.execute("project.openTree", {
	  tree: [
              //{
                //type: "file",
                //filename: "index.js",  
		//contents: Fs.readFileSync(__dirname + "/editor/template3/index.js", "utf8")
              //}
	    {
	      type: "file",
	      filename: "index.html",
	      contents: Fs.readFileSync(__dirname + "/editor/template2/index.html", "utf8"),
              active: true
	    },
	    {
	      type: "file",
	      filename: "app.js",
	      contents: Fs.readFileSync(__dirname + "/editor/template2/app.js", "utf8"),
              active: false
	    },
	    {
	      type: "file",
	      filename: "stage.cordova.js",
	      contents: Fs.readFileSync(__dirname + "/editor/template2/stage.cordova.js", "utf8"),
              active: false
	    },
	    {
	      type: "file",
	      filename: "textures.js",
	      contents: Fs.readFileSync(__dirname + "/editor/template2/textures.js", "utf8"),
              active: false
	    },
	    {
	      type: "file",
	      filename: "qunit.js",
	      contents: Fs.readFileSync(__dirname + "/editor/template2/qunit.js", "utf8"),
              active: false
	    },
	    {
	      type: "file",
	      filename: "test.js",
	      contents: Fs.readFileSync(__dirname + "/editor/template2/test.js", "utf8"),
              active: false
	    }
	  ]
	});
      });
    }
  });
  
/*  commander.addCommand({*/
    //name: "editor.open",
    //defaults: {
      //tree: ""
    //}, handler: ["plunkId", "tree", function (plunkId, tree) {
      //if (project.plunk && project.plunk.id === plunkId) return;
    
      //return commander.execute("project.open", {plunkId: plunkId}).then(function () {
	//if (tree) {
	  //return commander.execute("project.openTree", {tree: tree}).catch(function (err) {
	    //notifier.error("Failed to open the tree: " + treeState.read());
	    
	    //return commander.execute("project.openTree", {tree: project.getLastRevision().tree}).catch(function (err) {
	      //return commander.execute("editor.reset").then(function () {
		//notifier.error("Failed to open the given tree and the plunk's last revision");
	      //});
	    //});
	  //});
	//} else {
	  //return commander.execute("project.openTree", {tree: project.getLastRevision().tree}).catch(function (err) {
	    //return commander.execute("editor.reset").then(function () {
	      //notifier.error("Failed to open the plunk's last revision");
	    //});
	  //});
	//}
      //}, function (err) {
	//return commander.execute("editor.reset").then(function () {
	  //notifier.error("Failed to open plunk");
	//});
      //});
    //}]
  /*});*/
  
  commander.execute("preview.refresh");

  urlState.addState({
    name: "plunkId",
    queue: "project",
    scope: $scope,
    decode: function () {
      return $location.path().slice(6);
    },
    encode: function (plunkId) {
      return $location.path("/edit/" + (plunkId || ""));
    },
    read: function () {
      return project.isSaved() ? project.plunk.id : void 0;
    },
    write: function (plunkId) {
      return commander.execute("editor.reset");
    }
  });

  /*var treeState = urlState.addState({*/
    //name: "tree",
    //queue: "project",
    //scope: $scope,
    //decode: function () {
      //return $location.search().t;
    //},
    //encode: function (tree) {
      //var search = $location.search();
      
      //if (tree && tree !== project.tree) search.t = tree;
      //else delete search.t;
      
      //return $location.search(search);
    //},
    //read: function () {
      //if (project.isSaved()) return project.tree === project.getLastRevision().tree ? "" : project.tree;
      
      //return project.tree; // TODO
    //},
    //write: function (tree) {
      //if (tree) {
	//return commander.execute("project.openTree", {tree: tree});
      //} else if (project.isSaved()) {
	//return commander.execute("project.openTree", {tree: project.getLastRevision().tree});
      //}
    //}
  /*})*/;
}]);
