//
// Get User
//

// Controller Action
var action = function(req, res) {
	var user = {
		fname: "Roshan",
		lname: "Kulkarni"
	}
	return user;
}

// Interface
module.exports = {
		action: action
}
