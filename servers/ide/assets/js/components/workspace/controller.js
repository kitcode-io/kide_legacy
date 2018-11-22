module.exports = function($scope, $rootScope, $http, socket, commander, workspace, project) {
  this.layout = workspace.layout;
  this.isActive = workspace.isActive.bind(workspace);
  this.activate = workspace.activate.bind(workspace);
  this.split = workspace.split.bind(workspace);
  this.close = workspace.close.bind(workspace);
  $rootScope.submitButtonText = "Save";

  function getPaneDef() {
    return workspace.panes[workspace.nextPaneNum - 1];
  }

  function getFiles() {
    $http.get('/getFiles').then(function(res) {
      commander.execute("project.reset").then(function() {
        commander.execute("project.openTree", {
          tree: res.data
        });
      });
    });
  }

  function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    }
  }

  window.onload = function() {
    window.parent.postMessage('loaded', '*');
    $http.get('/getInfo').then(function(res) {
      console.log(res.data);
      socket.emit('info', {
        id: res.data
      });
    });
  };

  bindEvent(window, 'message', function(e) {
    var data = JSON.parse(e.data);
    document.getElementById("console").innerHTML =
      "<iframe src=\"" + data.terminal +
      "\" style=\"width: 100%;height:100%; \" frameborder=\"0\"></iframe>";
    document.getElementById("eye").innerHTML =
      "<a style=\"background-color: #555; color: white;\" target=\"_blank\" href=\"" +
      data.preview +
      "\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></a>";
  });

  getFiles();

  socket.on('close', function() {
    window.parent.postMessage('close', '*');
  });

  $scope.min = function () {
    window.parent.postMessage('minimize', '*');
  }

  $scope.max = function() {
    window.parent.postMessage('maximize', '*');
  }

  $scope.$watch(getPaneDef, function(paneDef) {
    var entries = project.entries[paneDef.id];
    $scope.paneDefId = paneDef.id;

    if (entries) {
      $scope.entries = {
        code: entries.contents,
        options: {
          theme: "zenburn",
          lineWrapping: true,
          mode: "javascript",
          lineNumbers: true,
          onSet: function(cm) {
            for (var i = 0; i <= cm.lineCount(); i++) {
              cm.indentLine(i, "smart");
            }
          },
          onLoad: function(cm) {
            cm.on('change', function(cMirror) {
              project.entries[$scope.paneDefId].contents = cMirror.getValue();
            });
          }
        }
      };
    }
  })
};
