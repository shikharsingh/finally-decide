var Machine = require("machine");
module.exports = {
    'logout': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Delete session key
                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].del({
                    "key": "username"
                }).setEnvironment({
                    req: req
                }).exec({
                    "error": function(deleteSessionKey) {
                        return exits.error({
                            data: deleteSessionKey,
                            status: 500
                        });

                    },
                    "success": function(deleteSessionKey) {
                        return exits.respond({
                            data: "/",
                            action: "redirect",
                            status: 200
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'login': function(req, res) {
        Machine.build({
            inputs: {
                "username": {
                    "example": "abc123",
                    "required": true
                },
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One User
                sails.machines['_project_3857_0.0.0'].findOne_user({
                    "criteria": {
                        username: inputs.username
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
                        // List User
                        sails.machines['_project_3857_0.0.0'].find_user({}).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listUser) {
                                // Encrypt password
                                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.3.0'].encryptPassword({
                                    "password": inputs.password
                                }).exec({
                                    "error": function(encryptPassword) {
                                        return exits.respond({
                                            data: null,
                                            action: "respond_with_value_and_status",
                                            status: 500,
                                            view: ""
                                        });

                                    },
                                    "success": function(encryptPassword) {
                                        // Check password
                                        sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.3.0'].checkPassword({
                                            "passwordAttempt": inputs.password,
                                            "encryptedPassword": (findOneUser && findOneUser.password)
                                        }).exec({
                                            "error": function(checkPassword) {
                                                return exits.error({
                                                    data: checkPassword,
                                                    status: 500
                                                });

                                            },
                                            "incorrect": function(checkPassword) {
                                                return exits.error({
                                                    data: checkPassword,
                                                    status: 500
                                                });

                                            },
                                            "success": function(checkPassword) {
                                                // Save to session
                                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].save({
                                                    "key": "username",
                                                    "value": inputs.username
                                                }).setEnvironment({
                                                    req: req
                                                }).exec({
                                                    "error": function(saveToSession) {
                                                        return exits.error({
                                                            data: saveToSession,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(saveToSession) {
                                                        // Log in
                                                        sails.machines['63fcae7b-edc4-4591-85b7-ba4863aa367e_0.3.2'].login({
                                                            "id": (findOneUser && findOneUser.id)
                                                        }).setEnvironment({
                                                            req: req
                                                        }).exec({
                                                            "error": function(logIn) {
                                                                return exits.error({
                                                                    data: logIn,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(logIn) {
                                                                return exits.respond({
                                                                    data: "decide",
                                                                    action: "redirect",
                                                                    status: 200,
                                                                    view: "template"
                                                                });

                                                            }
                                                        });

                                                    }
                                                });

                                            }
                                        });

                                    }
                                });

                            },
                            "error": function(listUser) {
                                return exits.error({
                                    data: listUser,
                                    status: 500
                                });

                            }
                        });

                    },
                    "error": function(findOneUser) {
                        return exits.error({
                            data: findOneUser,
                            status: 500
                        });

                    },
                    "notFound": function(findOneUser) {
                        return exits.error({
                            data: findOneUser,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "username": {
                    "example": "shikharsingh91",
                    "required": true
                },
                "name": {
                    "example": "shikhar",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Encrypt password
                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.3.0'].encryptPassword({
                    "password": inputs.password
                }).exec({
                    "error": function(encryptPassword) {
                        return exits.error({
                            data: encryptPassword,
                            status: 500
                        });

                    },
                    "success": function(encryptPassword) {
                        // Create User
                        sails.machines['_project_3857_0.0.0'].create_user({
                            "username": inputs.username,
                            "password": encryptPassword,
                            "name": inputs.name
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(createUser) {
                                // Save to session
                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].save({
                                    "key": "username",
                                    "value": inputs.username
                                }).setEnvironment({
                                    req: req
                                }).exec({
                                    "error": function(saveToSession) {
                                        return exits.error({
                                            data: saveToSession,
                                            status: 500
                                        });

                                    },
                                    "success": function(saveToSession) {
                                        return exits.respond({
                                            data: "decide",
                                            action: "redirect",
                                            status: 200,
                                            view: "template"
                                        });

                                    }
                                });

                            },
                            "error": function(createUser) {
                                return exits.error({
                                    data: createUser,
                                    status: 500
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'facebook': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "respond_with_status",
                    status: 200
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};