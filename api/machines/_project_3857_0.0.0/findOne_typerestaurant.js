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
    },
    "notFound": {
      "void": true
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": undefined,
  "fn": function(inputs, exits, env) {
    env.sails.models.typerestaurant.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_typerestaurant"
};