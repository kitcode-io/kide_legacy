var Fs = require("fs");

require("../../vendor/ui-bootstrap/ui-bootstrap");
require("../../vendor/angular-growl/angular-growl");

module.exports = angular.module("plunker.service.notifier", [
  "ui.bootstrap",
  "angular-growl"
])

.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(5000);
}])

.run(["$templateCache", function ($templateCache) {
  $templateCache.put("partials/modals/confirm.html", Fs.readFileSync(__dirname + "/../../../public/partials/modals/confirm.html", "utf8"));
  $templateCache.put("partials/modals/prompt.html", Fs.readFileSync(__dirname + "/../../../public/partials/modals/prompt.html", "utf8"));
  $templateCache.put("partials/modals/uploader.html", Fs.readFileSync(__dirname + "/../../../public/partials/modals/uploader.html", "utf8"));
}])


.factory("notifier", ["$rootScope", "$q", "$modal", "growl", "config", function ($rootScope, $q, $modal, growl, config) {
  var notifier = {
    confirm: function (question, answer) {
      return $modal.open({
        templateUrl: "partials/modals/confirm.html",
        scope: createScope({question: question, answer: answer || true})
      }).result.catch(function (e) {
        return false;
      });
    },
    prompt: function (question, initial) {
      return $modal.open({
        templateUrl: "partials/modals/prompt.html",
        scope: createScope({question: question, answer: initial || ""})
      }).result.catch(function (e) {
        return false;
      });
    },
    success: function (message){
      return $modal.open({
        templateUrl: "partials/modals/success.html",
        scope: createScope({message: message})
      }).result.catch(function (e) {
        return false;
      });
    },
    fileUploader: function () {
      return $modal.open({
        templateUrl: "partials/modals/uploader.html",
	controller: ["$scope", "$modalInstance", function ($scope, $modalInstance) {
	  $scope.fileUpload = function (){
            var f = document.getElementById('file').files[0];
	    var data = new FormData();
	    data.append('file', f);
            var postUrl = config.url.run + "/media/submit";
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", postUrl, true);
	    xhr.onload = function (e) {
	      if (this.status == 200) {
                $modalInstance.close(f.name);
	      }
	    };
	    xhr.send(data);
	  }
	}]
      }).result.catch(function (e) {
        return false;
      });
    },
    info: growl.addInfoMessage.bind(growl),
    error:  growl.addErrorMessage.bind(growl),
    //success: growl.addSuccessMessage.bind(growl),
    warn:  growl.addWarnMessage.bind(growl),
  };
  
  return notifier;
  
  function createScope (locals) {
    var scope = $rootScope.$new();
    
    angular.extend(scope, locals);
    
    return scope;
  }
}])

.directive('autofocus', ["$timeout", function ($timeout) {
  return {
    priority: 2,
    link: function ($scope, $element, $attrs) {
      $timeout(function () {
        $element[0].focus();
        if ($attrs.autoselect)
          if ($element[0].select) $element[0].select();
          if ($element[0].setSelectionRange) $element[0].setSelectionRange(0, $element[0].value.length);
      }, 10);
    }
  };
}]);
