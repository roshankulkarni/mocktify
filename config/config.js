//
// API Server Configuration
// @author Roshan
//
var config = {
	current: "development",
	default: {
		port: 3000,
		controllersDir: "./controllers",
		prettyPrintJSON: true
	},
	development: {
		port: 3000,
		controllersDir: "./controllers",
		prettyPrintJSON: true
	},
	staging: {
		port: 4000,
		controllersDir: "./controllers",
		prettyPrintJSON: true
	},
	production: {
		port: 4000,
		controllersDir: "./controllers",
		prettyPrintJSON: false
	}	
}

//
// Return config object based on the current environment
//
var getConfig = function() {
	var current = config.current;
	return config[current];
}

// Interface
module.exports = {
	getConfig: getConfig
}