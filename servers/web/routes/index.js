var Request = require("request");
var handlebars = require('handlebars');
var When = require("when");
var Path = require("path");
var txnId = require('txnid');
var payumoney = require('payumoney-node');
payumoney.setKeys('lzXpTW2l', 'GwfV7m3KS0', 'BDdURBMX5oPTSlGLnaqlxrY8OrzgY5mFTCjNXwWAri4=');
payumoney.isProdMode(true);

handlebars.registerHelper('json', function(context) {
    var con = JSON.stringify(context);
    return con;
});

module.exports = function(options) {

    var routes = [{
            method: 'GET',
            path: '/',
            config: {
                auth: {
                    strategy: 'session',
                    mode: 'try'

                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                }

            },
            handler: function(request, reply) {
                reply.view('main', {
                    css: 'hidden'
                }, {
                    layout: "landing"
                });
            }


        }, {
            method: 'GET',
            path: '/landing/java',
            config: {
                auth: {
                    strategy: 'session',
                    mode: 'try'

                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: '/'
                    }
                }

            },

            handler: function(request, reply) {
                var context = {
                    config: this.local,
                    css: 'top'
                };
                var server = this.config.server;
                var payload = request.auth.credentials.profile;
                var url = "http://" + server.api.host + ":" + server.api.port + "/course/validation";
                Request.post({
                    url: url,
                    form: payload
                }, function(err, httpResponse, body) {

                    var profile = (JSON.parse(body))[0];
                    profile.verified = true;
                    
		    request.cookieAuth.clear();
			
                    request.cookieAuth.set({
                        profile
                    });

                    if (profile.java == true)
                        loadPage();
                    else
                        reply.redirect('/id/profile');
                });


                function loadPage() {
                    var server = options.config.server;
                    Request("http://" + server.api.host + ":" + server.api.port + "/course", function(err, res, data) {
                        var data = JSON.parse(data);
                        var promisify = function(key) {
                            return new Promise(function(resolve, reject) {
                                Request.get("http://" + server.api.host + ":" + server.api.port + "/handshake", function(err, res, token) {
                                    data[key].plunkId = token;
                                    resolve();
                                });
                            });
                        };
                        var promises = [];
                        for (var key in data) {
                            promises.push(promisify(key));
                        }
                        Promise.all(promises).then(function() {
                            context.body = {
                                plunk: data
                            };
                            return reply.view("home", context, {
                                layout: "landing"
                            });
                        }).catch(function(err) {
                            console.log(err);
                        });
                    });

                }
            }

        },
        {
            method: 'GET',
            path: '/edit/{courseName}/{testNo}/{plunkId}',
            config: {
                auth: {
                    strategy: 'session'

                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: '/'
                    }
                }
            },
            handler: function(request, reply) {
                var server = this.config.server;
                var param = request.params;
                var courseName = request.params.courseName;
                var context = {
                    "url": {
                        "run": ""
                    }
                };

                reply.view("editor", context);

            }

        }, {
            method: 'GET',
            path: '/getFiles/{courseName}/{templateName}/{sessionId}',
            config: {
                handler: function(request, reply) {
                    var server = this.config.server;
                    var requestParams = request.params;
                    var courseName = requestParams.courseName;
                    var templateName = requestParams.templateName;
                    var sessionId = requestParams.sessionId;

                    Request("http://" + server.api.host + ":" + server.api.port + "/getFiles/" + courseName + "/" + templateName + "/" + sessionId, function(err, res, body) {

                        reply(body)

                    });
                }
            }
        }, {
            method: 'POST',
            path: '/java/{testName}/{pathId}',
            handler: function(request, reply) {
                var server = this.config.server;
                var params = request.params;
                var testName = encodeURIComponent(params.testName);
                var pathId = encodeURIComponent(params.pathId);
                var payload = request.payload;
                var url = "http://" + server.api.host + ":" + server.api.port + "/java/" + testName + "/" + pathId;

                Request.post({
                    url: url,
                    form: payload
                }, function(err, httpResponse, body) {
                    reply(body);
                });
            }
        }, {
            method: 'GET',
            path: '/users/exists/{username}',
            config: {
                handler: function(request, reply) {
                    var server = this.config.server;
                    var username = request.params.username;

                    Request("http://" + server.api.host + ":" + server.api.port + '/users/exists/' + username, function(err, res, body) {
                        console.log(body);
                    });
                }
            }
        }, {
            method: 'GET',
            path: '/users/{username}',
            config: {
                handler: function(request, reply) {
                    var context = {
                        config: this.local
                    };
                    var fetchUser = function(username) {
                        return When.promise(function(resolve, reject) {
                            request.server.methods.fetchUser(username, function(err, result) {
                                if (err) return reject(err);
                                resolve(result);
                            });
                        });
                    };
                    var fetchPlunks = function(q) {
                        return When.promise(function(resolve, reject) {
                            request.server.methods.fetchPlunks(q, function(err, result) {
                                if (err) return reject(err);
                                resolve(result);
                            });
                        });
                    };
                    var q = ["@" + request.params.username];
                    var identity = request.state["plunker.tok"];

                    if (!identity || request.params.username !== identity.user_name) {
                        q.push("in:plunker/public");
                    }

                    When.join(
                        fetchUser(request.params.username),
                        fetchPlunks(q.join(" "))
                    ).then(function(results) {
                        context.user = results[0];
                        context.plunks = results[1];

                        reply.view("user", context, {
                            layout: "landing"
                        });
                    });
                }
            }
        }, {
            method: 'GET',
            path: '/{path*}',
            config: {
                handler: {
                    directory: {
                        path: Path.join(__dirname, "../public")
                    }
                }
            }
        }, {
            method: "*",
            path: "/{p*}",
            config: {
                handler: function(request, reply) {
                    reply.view("notfound", {}, {
                        layout: "landing"
                    }).code(404);
                }
            }
        }, {
            method: ['GET', 'POST'],
            path: '/auth/facebook',
            config: {
                auth: {
                    strategy: 'facebook',
                    mode: 'try'
                },
                handler: function(request, reply) {

                    if (!request.auth.isAuthenticated) {
                        return reply('Authentication failed due to: ' + request.auth.error.message);
                    }

                    var cred = request.auth.credentials;
                    var ser_id = cred.provider + "_id";
                    var credentials = {
                        ser_id: ser_id,
                        [ser_id]: cred.profile.id,
                        name: cred.profile.displayName,
                        email: cred.profile.email,
                        pro_pic: cred.profile.photo,
                        java: false

                    };


                    var url = "http://" + options.config.server.api.host + ":" + options.config.server.api.port + "/users";
                    Request.post({
                        url: url,
                        form: credentials
                    }, function(err, httpResponse, body) {
                        var profile = (JSON.parse(body))[0];
                        profile.verified = true;
                        request.cookieAuth.set({
                            profile
                        });
                        return reply.view("auth/complete.html", {
                            payload: "auth." + Buffer(JSON.stringify({
                                status: "success"
                            })).toString("base64")
                        });

                    });
                }
            }
        }, {
            method: 'GET',
            path: '/user/auth',
            config: {
                auth: {
                    strategy: 'session'

                },
            },
            handler: function(request, reply) {
                var data = request.auth.credentials.profile;
                reply(data);
            }

        }, {
            method: 'GET',
            path: '/logout',
            config: {
                auth: {
                    strategy: 'session'

                }
            },
            handler: function(request, reply) {
                request.cookieAuth.clear();
                return reply.redirect('/');
            }

        }, {
            method: 'POST',
            path: '/success/java',
            handler: function(request, reply) {
                var url = "http://" + options.config.server.api.host + ":" + options.config.server.api.port + "/purchase";
                var txnid = request.payload.txnid;
                payumoney.paymentResponse(txnid, function(error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        var paymentStatus = {
                            id: response[0].merchantTransactionId,
                            status: response[0].postBackParam.status
                        }

                        Request.post({
                            url: url,
                            form: paymentStatus
                        }, function(err, httpresponse, body) {
				console.log('aab main landing k paas jaega');
                            reply.redirect('/landing/java');
                        });

                    }
                });
            }
        }, {
            method: 'GET',
            path: '/purchase/java',
            config: {
                auth: {
                    strategy: 'session'
                }
            },
            handler: function(request, reply) {
                var user = request.auth.credentials.profile;
                var paymentData = {
                    productinfo: "JAVA",
                    txnid: user._id,
                    amount: "1",
                    email: user.email,
                    phone: "",
                    lastname: "",
                    firstname: user.name,
                    surl: "http://" + options.config.server.web.host + ":" + options.config.server.web.port + "/success/java",
                    furl: "http://" + options.config.server.web.host + ":" + options.config.server.web.port + "/fail/java"
                };
                payumoney.makePayment(paymentData, function(err, response) {
                    if (err) {
                        console.log(err)
                    } else {
                        reply.redirect(response);
                    }
                });

            }
        }
        , {
                method: 'GET',
                path: '/mock',
                handler: function(request, reply) {
                var url = "http://" + options.config.server.api.host + ":" + options.config.server.api.port + "/purchase";
                var txnid = '5ac20595374cdd7b3a8bbdf6';
                payumoney.paymentResponse(txnid, function(error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        var paymentStatus = {
                            id: response[0].merchantTransactionId,
                            status: response[0].postBackParam.status
                        }

                        Request.post({
                            url: url,
                            form: paymentStatus
                        }, function(err, httpresponse, body) {
				console.log('aab main landing k paas jaega');
                            reply.redirect('/landing/java');
                        });

                    }
                });
                }
            }
        , {
            method: 'POST',
            path: '/fail/java',
            handler: function(request, reply) {
                reply.redirect('/landing/java?status=new');
            }
        }
    ];

    return routes;
}
