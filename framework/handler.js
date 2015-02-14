//
// Generic Controller Invoker
// @author Roshan
//

// Dependencies
var u = require('underscore');

//
// Delegate to the specified controller. Apply latency if required.
// Log the response. Prettify JSON.
//
function delegateToController(route, controllerFn, req, res) {


	// Flag that the route matched (So that 404 Handler Knows About It)
	console.log("Matched Routing Rule: %s", JSON.stringify(route));
	res.locals.routeMatched = true;

	// Latency configured?
	var latency = 0;
	if(u.has(route, "latency") && u.isNumber(route.latency)) {
		latency = route.latency;
	}

	// Enforce Latency.
	setTimeout(function() {

		// Invoke the target controller
		var resObj = controllerFn(req, res);

		// Logging Output
		console.log("Response: %s %s", res.locals.requestId, JSON.stringify(resObj, null, 4));

		// Generate HTTP Output
		res.status(200);
		res.json(resObj);

	}, latency);


}

module.exports = {
	delegate: delegateToController
}