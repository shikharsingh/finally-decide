var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Check login status
                sails.machines['63fcae7b-edc4-4591-85b7-ba4863aa367e_0.3.2'].checkLogin({}).setEnvironment({
                    req: req
                }).exec({
                    "error": function(checkLoginStatus) {
                        return exits.respond({
                            data: "oh no",
                            action: "respond_with_value_and_status",
                            status: 500
                        });

                    },
                    "otherwise": function(checkLoginStatus) {
                        return exits.error({
                            data: checkLoginStatus,
                            status: 500
                        });

                    },
                    "success": function(checkLoginStatus) {
                        // List Restaurants
                        sails.machines['_project_3857_0.0.0'].find_restaurants({}).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(listRestaurants) {
                                // Find One User
                                sails.machines['_project_3857_0.0.0'].findOne_user({
                                    "criteria": {
                                        username: (req.session.username ? (req.session.username + '') : '')
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(findOneUser) {
                                        return exits.respond({
                                            data: {
                                                restaurants: listRestaurants,
                                                name: (findOneUser && findOneUser.name),
                                                layout: "internal"
                                            },
                                            action: "display_view",
                                            status: 200,
                                            view: "decide"
                                        });

                                    },
                                    "error": function(findOneUser) {
                                        return exits.respond({
                                            data: "oh no!",
                                            action: "respond_with_value_and_status",
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

                            },
                            "error": function(listRestaurants) {
                                return exits.error({
                                    data: listRestaurants,
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
    }
};