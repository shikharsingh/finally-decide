var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
        Machine.build({
            inputs: {
                "type": {
                    "example": "Asian",
                    "required": true
                },
                "name": {
                    "example": "McDonalds",
                    "required": true
                },
                "rating": {
                    "example": 5,
                    "required": true
                },
                "description": {
                    "example": "this is a local establishment that has fantastic asian fusion food.",
                    "required": true
                },
                "address": {
                    "example": "1014 Hayden Creek",
                    "required": true
                },
                "zipcode": {
                    "example": 77479,
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Create Restaurants
                sails.machines['_project_3857_0.0.0'].create_restaurants({
                    "type": inputs.type,
                    "name": inputs.name,
                    "rating": inputs.rating,
                    "description": inputs.description,
                    "longitude": 0,
                    "latitude": 0,
                    "address": inputs.address,
                    "zipcode": inputs.zipcode
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(createRestaurants) {
                        return exits.respond({
                            data: {
                                message: "\"Your submission has been added to the list!\""
                            },
                            action: "respond_with_value_and_status",
                            status: 200
                        });

                    },
                    "error": function(createRestaurants) {
                        return exits.error({
                            data: createRestaurants,
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