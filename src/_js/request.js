/* eslint-disable no-undef */

var button = $("#submit-button")

var titleInput = $("#title")
var descriptionInput = $("#description")
var categoryInput = $("#category")
var turnAroundTime = $("#turn-time")
var startingPrice = $("#starting-price")

//Event listener for the commission request form
// newCommissionRequestForm.on("click", userInfo)
button.on("click", userInfo)
//Function that gets the user's info and passes that to the new object to post
function userInfo() {
	$.get("/api/user/current", data => {
		createNewCommissionObject(data)
	})
}

//Function that creates the request object to be passed to the api
function createNewCommissionObject(userInfo) {
	var newRequest = {
		title: titleInput.val().trim(),
		description: descriptionInput.val().trim(),
		category: categoryInput.val().trim(),
		turnaround_time: turnAroundTime.val().trim(),
		starting_price: startingPrice.val().trim(),
		UserId: userInfo.id,
	}
	postCommissionRequest(newRequest)
}
