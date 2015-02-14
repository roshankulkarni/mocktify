# Mocktify API Server
Mocktify is a framework to help you quickly generate "Mock REST APIs". When developing client applications, you sometimes need to assemble a set of mock REST endpoints which your clients can invoke. These endpoints need to support various HTTP VERBS for inbound HTTP requests and then return static JSON responses to the client. Mocktify is an ExpressJS-powered framework that help you define route mappings and controller code to implement these mock endpoints.


# Getting Started

## Running the Mocktify Server

To get started, simply clone this project and then install the dependencies required by Mocktify:

```
$ npm install
```

Then, let's go ahead and run the Mocktify server:
```
$ node app.js
```

## Testing the Mocktify Server

By default, Mocktify exposes a bunch of sample REST endpoints that you can invoke right away. You can use CURL or another other REST Client tool to do this. Here is an example:

```
curl -X GET http://localhost:3000/api/user/1
```


# Mocktify Directory Structure

`/config`

Contains configuration files and route definitions.

`/controllers`

Contains target controllers which are mapped to the various URIs. Controllers can be organized in a sub-directory hierarchy here to your liking. Just make sure you configure the route definitions appropriately.

`/framework`

Contains the framework code. You are unlikely to muck around this folder, unless you are extending the framework itself.


# Mocktify Configuration


## Customizing Routes
Custom routes can be defined in the `config/routes.js` file. The `routeDef` array in that file is a collection of defined routes. Each route looks like this:

```
	...
	{
		name: "Fetch User API",
		uri: "/api/user/:id",
		method: "get",
		controller: "user/get",
		latency: 2000
	}
	... More Routes
```

Attribute | Description
--------- | -----------
name | Human readable name of this route
uri | URI of the incoming HTTP request
method | Method (HTTP Verb) of the incoming HTTP request
controller | Controller module to be invoked when a request is received
latency | Simulate a response latency before actually sending the response back to the client


## Server Configuration

You can deploy Mocktify in various environments with different configurations for each environment. The server configuration is found at this location `config/config.js`.

Here are the presently supported configuration parameters:
```
{
	port: 3000,
	controllersDir: "./controllers",
	prettyPrintJSON: true
}
```
Attribute | Description
--------- | -----------
port | Port at which the HTTP server should listen
controllersDir | Directory where controller modules are present
prettyPrintJSON | Should Mocktify return pretty-printed JSON to the client or not?


# License

Mocktify is licensed under the MIT Free Software License.

