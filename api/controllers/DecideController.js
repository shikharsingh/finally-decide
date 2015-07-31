var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
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
                                        name: (findOneUser && findOneUser.name)
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
                        return exits.respond({
                            data: "oh no",
                            action: "respond_with_value_and_status",
                            status: 500
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