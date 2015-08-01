module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Restaurants instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "address": "1014 Hayden Creek",
        "description": "this is a local establishment that has fantastic asian fusion food.",
        "type": "Asian",
        "zipcode": 77479,
        "latitude": -180,
        "longitude": 150,
        "name": "McDonalds",
        "rating": 5,
        "id": 123,
        "createdAt": "2015-08-01T15:43:41.485Z",
        "updatedAt": "2015-08-01T15:43:41.485Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.restaurants.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_restaurants"
};