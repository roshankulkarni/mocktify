//
// Update Product
//

// Controller Action
var action = function(req, res) {
	var product = {
		skuid: "123123",
		name: "Coffee Beans"
	}
	return product;
}

// Interface
module.exports = {
		action: action
}
