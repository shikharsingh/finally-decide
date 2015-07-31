module.exports = {
  "inputs": {
    "username": {
      "example": "shikharsingh91",
      "friendlyName": "username",
      "required": true
    },
    "password": {
      "example": "password",
      "friendlyName": "password",
      "required": true
    },
    "name": {
      "example": "shikhar",
      "friendlyName": "name",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "username": "shikharsingh91",
        "password": "password",
        "name": "shikhar",
        "id": 123,
        "createdAt": "2015-07-24T05:16:11.897Z",
        "updatedAt": "2015-07-24T05:16:11.897Z"
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
    env.sails.models.user.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_user"
};