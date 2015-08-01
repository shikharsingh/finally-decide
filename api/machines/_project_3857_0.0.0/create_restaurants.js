module.exports = {
  "inputs": {
    "address": {
      "example": "1014 Hayden Creek",
      "friendlyName": "address",
      "required": true
    },
    "description": {
      "example": "this is a local establishment that has fantastic asian fusion food.",
      "friendlyName": "description",
      "required": true
    },
    "type": {
      "example": "Asian",
      "friendlyName": "type",
      "required": true
    },
    "zipcode": {
      "example": 77479,
      "friendlyName": "zipcode",
      "required": true
    },
    "latitude": {
      "example": -180,
      "friendlyName": "latitude"
    },
    "longitude": {
      "example": 150,
      "friendlyName": "longitude"
    },
    "name": {
      "example": "McDonalds",
      "friendlyName": "name",
      "required": true
    },
    "rating": {
      "example": 5,
      "friendlyName": "rating",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
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
      }
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.restaurants.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_restaurants"
};