# Mocktify API Server
Mocktify is a framework to help you quickly generate "Mock REST APIs". When developing client applications, you sometimes need to assemble a set of mock REST endpoints that can handle various HTTP VERBS and which can be invoked from your client. Mocktify is an ExpressJS-powered framework that help you define route mappings and controller code to implement these mock endpoints.

# Getting Started

## Running the Mocktify Server:

To get started, simply clone this project and then run the Mocktify server this way:


```
$ npm install
$ node app.js
```

## Testing the Mocktify Server:

By default, Mocktify has a bunch of test REST endpoints that you can invoke right away. You can use CURL or another other REST Client tool to do this:

```
curl http://localhost:3000/api/user/1
```

# Understanding the Mocktify Directory Structure

`/config`
Contains configuration files and route definitions.

`/controllers`
Contains target controllers which are mapped to the various URIs. Controllers can be organized in a sub-directory hierarchy here to your liking. Just make sure you configure the route definitions appropriately.

`/framework`
Contains the framework code. You are unlikely to muck around this folder, unless you are extending the framework itself.


# License

Mocktify is licensed under the MIT Free Software License.

