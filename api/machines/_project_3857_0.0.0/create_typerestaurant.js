module.exports = {
  "inputs": {
    "Type": {
      "example": "Asian",
      "friendlyName": "Type",
      "required": true
    },
    "value": {
      "example": 1,
      "friendlyName": "value",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "Type": "Asian",
        "value": 1,
        "id": 123,
        "createdAt": "2015-08-01T15:45:58.040Z",
        "updatedAt": "2015-08-01T15:45:58.040Z"
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
    env.sails.models.typerestaurant.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_typerestaurant"
};