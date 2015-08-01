module.exports.routes = {
  "post /user/logout": {
    "target": "UserController.logout"
  },
  "get /signup": {
    "target": "SignupController.find"
  },
  "get /login": {
    "target": "LoginController.get_find"
  },
  "get /test/yelp": {
    "target": "TestController.yelp"
  },
  "get /user/facebook": {
    "target": "UserController.facebook"
  },
  "post /user/create": {
    "target": "UserController.create"
  },
  "get /partialtest": {
    "target": "PartialtestController.find"
  },
  "post /restaurant/create": {
    "target": "RestaurantController.create"
  },
  "get /decide": {
    "target": "DecideController.find"
  },
  "post /login": {
    "target": "LoginController.post_create"
  },
  "get /template": {
    "target": "TemplateController.find"
  },
  "post /user/login": {
    "target": "UserController.login"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /template2": {
    "target": "Template2Controller.find"
  }
};