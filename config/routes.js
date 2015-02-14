//
// Route Mappings (URI x METHOD) => Controller File
// @author Roshan
//
var routeDef = [
	//
	// User Routes
	//
	{
		name: "Get User",
		uri: "/api/user/:id",
		method: "get",
		controller: "user/get",
		latency: 2000
	},
	{
		name: "Add User",
		uri: "/api/user/",
		method: "post",
		controller: "user/add",
		latency: 200
	},
	{
		name: "Update User",
		uri: "/api/user/:id",
		method: "put",
		controller: "user/update",
		latency: 200
	},
	{
		name: "Delete User",
		uri: "/api/user/:id",
		method: "delete",
		controller: "user/delete",
		latency: 200
	},
	//
	// Product Routes
	//
	{
		name: "Get Product",
		uri: "/api/product/:id",
		method: "get",
		controller: "product/get",
		latency: 200
	},
	{
		name: "Add Product",
		uri: "/api/product/",
		method: "post",
		controller: "product/add",
		latency: 200
	},
	{
		name: "Update Product",
		uri: "/api/product/:id",
		method: "put",
		controller: "product/update",
		latency: 200
	},
	{
		name: "Delete Product",
		uri: "/api/product/:id",
		method: "delete",
		controller: "product/delete",
		latency: 200
	}		
];

//
// Return defined route mappings
//
var getRoutes = function() {
	return routeDef;
}

// Interface
module.exports = {
	getRoutes: getRoutes
}
