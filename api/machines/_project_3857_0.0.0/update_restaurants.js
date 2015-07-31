module.exports = {
  "inputs": {
    "type": {
      "example": "Asian",
      "friendlyName": "type"
    },
    "name": {
      "example": "McDonalds",
      "friendlyName": "name"
    },
    "rating": {
      "example": 5,
      "friendlyName": "rating"
    },
    "description": {
      "example": "this is a local establishment that has fantastic asian fusion food.",
      "friendlyName": "description"
    },
    "longitude": {
      "example": 150,
      "friendlyName": "longitude"
    },
    "latitude": {
      "example": -180,
      "friendlyName": "latitude"
    },
    "address": {
      "example": "1014 Hayden Creek",
      "friendlyName": "address"
    },
    "zipcode": {
      "example": 77479,
      "friendlyName": "zipcode"
    },
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
    env.sails.models.restaurants.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_restaurants"
};