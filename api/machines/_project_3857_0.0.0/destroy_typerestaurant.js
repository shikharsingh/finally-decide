module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Typerestaurant instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "Type": "Asian",
        "value": 1,
        "id": 123,
        "createdAt": "2015-08-01T15:45:58.040Z",
        "updatedAt": "2015-08-01T15:45:58.040Z"
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
    env.sails.models.typerestaurant.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_typerestaurant"
};