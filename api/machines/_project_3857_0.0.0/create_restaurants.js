module.exports = {
  "inputs": {
    "type": {
      "example": "Asian",
      "friendlyName": "type",
      "required": true
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
    },
    "description": {
      "example": "this is a local establishment that has fantastic asian fusion food.",
      "friendlyName": "description",
      "required": true
    },
    "longitude": {
      "example": 150,
      "friendlyName": "longitude",
      "required": true
    },
    "latitude": {
      "example": -180,
      "friendlyName": "latitude",
      "required": true
    },
    "address": {
      "example": "1014 Hayden Creek",
      "friendlyName": "address",
      "required": true
    },
    "zipcode": {
      "example": 77479,
      "friendlyName": "zipcode",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "type": "Asian",
        "name": "McDonalds",
        "rating": 5,
        "description": "this is a local establishment that has fantastic asian fusion food.",
        "longitude": 150,
        "latitude": -180,
        "address": "1014 Hayden Creek",
        "zipcode": 77479,
        "id": 123,
        "createdAt": "2015-07-25T03:13:56.324Z",
        "updatedAt": "2015-07-25T03:13:56.324Z"
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