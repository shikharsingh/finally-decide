module.exports.routes = {
  "get /login": {
    "target": "LoginController.get_find"
  },
  "get /user/facebook": {
    "target": "UserController.facebook"
  },
  "get /template2": {
    "target": "Template2Controller.find"
  },
  "get /partialtest": {
    "target": "PartialtestController.find"
  },
  "get /test/yelp": {
    "target": "TestController.yelp"
  },
  "get /decide": {
    "target": "DecideController.find"
  },
  "post /user/login": {
    "target": "UserController.login"
  },
  "post /user/create": {
    "target": "UserController.create"
  },
  "post /login": {
    "target": "LoginController.post_create"
  },
  "get /template": {
    "target": "TemplateController.find"
  },
  "get /signup": {
    "target": "SignupController.find"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "post /restaurant/create": {
    "target": "RestaurantController.create"
  }
};