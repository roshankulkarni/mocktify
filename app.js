//
// Mocktify API Server: Mock REST API Server
// @author Roshan
//

// Dependencies
var express = require('express');
var u = require('underscore');
var uuid = require('node-uuid');

// Framework
var handler = require('./framework/handler');

// Load Config
var config = require('./config/config').getConfig();
var routes = require('./config/routes').getRoutes();

//
// Server Bootstrapping
//

//
// Validate Route Definitions. Warn and Ignore Any Invalid Route Definitions.
//
var sanitisedRoutes = [];
var routeURIs = [];

u.each(routes, function(route) {

	console.log("Validating Route Def: %s", JSON.stringify(route));

	// Validate: Empty URI?
	if(u.isEmpty(route.uri)) {
		console.log("Missing URI in Def: ", JSON.stringify(route));
		return;
	}

	// Validate: Empty Method?
	if(u.isEmpty(route.method)) {
		console.log("Missing Method in Def: %s", JSON.stringify(route));
		return;
	}

	// Validate: Empty Controller?
	if(u.isEmpty(route.controller)) {
		console.log("Missing Controller in Def: %s", JSON.stringify(route));
		return;
	}

	// Validate: HTTP Method
	var supportedMethods = [
		"get",
		"post",
		"put",
		"delete"
	];
	if(!(u.contains(supportedMethods, route.method))) {
		console.log("Unsupported HTTP Method in Def: %s", JSON.stringify(route));
		return;
	}

	// Validate: Duplicate Route URI for Same HTTP Method?
	if(u.contains(routeURIs, route.uri + ":::" + route.method)) {
		console.log("Duplicate URI in Def: %s", JSON.stringify(route));
		return;		
	}

	// Validate: Target Controller Exists?
	var targetController;
	try {
		targetController = require('./controllers/' + route.controller);
	} catch (e) {
		console.log("Controller Not Found for Def: %s", JSON.stringify(route));
		return;
	}

	// Validate: Target Controller has Expected Method Signature?
	if(!(u.isFunction(targetController.action))) {
		console.log("Controller Missing 'action' Method for Def: %s", JSON.stringify(route));
		return;
	}

	// Validated Successfully.
	sanitisedRoutes.push(route);
	routeURIs.push(route.uri + ":::" + route.method);

});

// At least one route exists?
if(u.isEmpty(sanitisedRoutes)) {
		console.log("Controller Missing 'action' Method for Def: %s", JSON.stringify(route));
		exit(1);
}

//
// Instantiate Express Web App (Server)
//
var app = express();
app.listen(config.port);
app.set('x-powered-by', false);

// Pretty Print JSON
// http://expressjs.com/4x/api.html#app.settings.table
if(u.has(config, "prettyPrintJSON") && u.isBoolean(config.prettyPrintJSON) && config.prettyPrintJSON) {
	app.set('json spaces', 4);
}

//
// Middleware: Prepare every inbound request.
//
app.use('/', function(req, res, next) {

	// Tagging each request with a UUID Tracer
	var uuidValue = uuid.v4();
	res.locals.requestId = uuidValue;

	// Resetting routeMatched flag
	res.locals.routeMatched = false;

	// Pipeline
	next();

});

//
// Middleware: Logging every inbound request
//
app.use('/', function(req, res, next) {

	// Log URI, Headers, Body.
	console.log('Request: %s %s %s', res.locals.requestId, req.method, req.url);

	// Pipeline
	next();

});

//
// Binding Route URIs to Controller Objects
//

// Bind each route to a controller
u.each(sanitisedRoutes, function(route) {

	// Route definition
	// var route = sanitisedRoutes[i];
	console.log("Binding Route Def: %s", JSON.stringify(route));

	// Instantiate target controller
	var controller = require('./controllers/' + route.controller);

	// Bind route
	app[route.method](route.uri, function(req, res, next) {
		handler.delegate(route, controller.action, req, res);
	});

});

//
// Middleware: Catch-all Scenarios and Error Handling
//

// 404 Handler (Route Not Found)
app.use('/', function(req, res, next) {

	// No route matched?
	if(!res.locals.routeMatched) {
		res.send("404: Sorry, no routes matched.");
	}

});

// 500 Handler (Error or Exception)
app.use('/', function(err, req, res, next) {
	console.log("Error: " + err);
	res.send("500: Sorry, internal error.");
});
