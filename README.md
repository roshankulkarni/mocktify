# Mocktify API Server
Framework to quickly expose Mock REST endpoints.

# Getting Started

Running the Mocktify Server:
npm install
node app.js

Testing the Mocktify Server:
curl http://localhost:3000/api/user/1

# Understanding the Directory Structure

/config
Contains Configuration Files

/framework
Contains the Framework Code. You are unlikely to muck around this, unless you are extending the framework itself.

/controllers
Contains target controllers which are mapped to the various URIs. Controllers can be organized in a sub-directory hierarchy here.

# License

Mocktify is licensed under the MIT License.

