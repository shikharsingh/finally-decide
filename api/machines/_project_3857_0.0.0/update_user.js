module.exports = {
  "inputs": {
    "username": {
      "example": "shikharsingh91",
      "friendlyName": "username"
    },
    "password": {
      "example": "password",
      "friendlyName": "password"
    },
    "name": {
      "example": "shikhar",
      "friendlyName": "name"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving User instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "username": "shikharsingh91",
        "password": "password",
        "name": "shikhar",
        "id": 123,
        "createdAt": "2015-07-24T05:16:11.897Z",
        "updatedAt": "2015-07-24T05:16:11.897Z"
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
    env.sails.models.user.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_user"
};