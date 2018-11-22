var Fs = require("fs");


module.exports = angular.module("plunker.component.userPane", [
    "ui.bootstrap",
    require("../login").name,
    require("../marked").name,
    require("../notifier").name,
    require("../visitor").name
])

.directive("plunkerUserPane", ["collectionsManager", function(collectionsManager) {

    var getAuth = function($http, cb) {
        return $http.get('/user/auth').then(function(response) {
		return response.data;           
	});
    };

    return {
        restrict: "E",
        replace: true,
        template: Fs.readFileSync(__dirname + "/userPane.html", "utf8"),
        controllerAs: "userPane",
        controller: ["$scope", "$http", "login", "visitor", function($scope, $http, login, visitor) {
            var self = this;
            self.visitor = visitor;

            self.showLoginWindow = function() {
                login.open();
            };
            getAuth($http).then(function(data) {
                self.user = data;
            });
            self.showCollectionsManager = function() {
                collectionsManager.show();
            };
        }]
    };
}])

.factory("collectionsManager", ["$http", "$modal", "config", "notifier", "visitor", function($http, $modal, config, notifier, visitor) {
    var manager = {
        showCreateWindow: function() {
            return $modal.open({
                template: Fs.readFileSync(__dirname + "/createCollection.html", "utf8"),
                size: "lg",
                controller: ["$scope", "$modalInstance", "visitor", function($scope, $modalInstance, visitor) {
                    if (!visitor.isMember()) return $modalInstance.dismiss("Not logged in");

                    visitor.user.is_premium = true;

                    $scope.coll = {
                        name: "",
                        title: "",
                        description: "",
                        is_restricted: false,
                        is_private: false,
                        is_curated: false,
                    };
                    $scope.visitor = visitor;

                    $scope.save = function(coll) {
                        manager.save(coll).then(function(coll) {
                            return $modalInstance.close(coll);
                        }, function(err) {
                            $scope.error = "Unable to create collection: " + (err.data ? err.data.message : "Unknown error");
                            return err;
                        });
                    };
                }]
            }).result;
        },
        save: function(coll) {
            return visitor.getCredentials().then(function(credentials) {

                return $http.post(config.url.api + "/users/" + credentials.user_name + "/collections", coll, {
                    params: {
                        token: credentials
                    }
                }).then(function(response) {
                    return response.data;
                });
            });
        },
        show: function() {
            $modal.open({
                template: Fs.readFileSync(__dirname + "/manageCollections.html", "utf8"),
                //size: "lg",
                controller: ["$scope", "$modalInstance", "visitor", function($scope, $modalInstance, visitor) {
                    $scope.collections = [];
                    $scope.visitor = visitor;

                    $scope.refreshCollections = function() {
                        return visitor.getCredentials().then(function(credentials) {
                            return $http.get(config.url.api + "/users/" + visitor.user.username + "/collections", {
                                params: {
                                    token: credentials
                                }
                            }).then(function(response) {
                                angular.copy(response.data.results, $scope.collections);

                                return $scope.collections;
                            }, function(err) {
                                notifier.error("Failed to create collection.");
                            });
                        });
                    };

                    $scope.showCreateWindow = function() {
                        manager.showCreateWindow();
                    };

                    $scope.refreshCollections();
                }]
            });
        }
    };

    return manager;
}])

;
