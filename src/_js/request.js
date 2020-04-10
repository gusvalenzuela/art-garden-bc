/* eslint-disable no-undef */

var newCommissionRequestForm = $("#new-commission-request-form")

var titleInput = $("#title")
var descriptionInput = $("#description")
var categoryInput = $("#category")
// var tagsInput = $("#tags-input")

//Event listener for the commission request form
newCommissionRequestForm.on("submit", userInfo)
//Function that gets the user's info and passes that to the new object to post
function userInfo(event) {
	event.preventDefault()
	$.get("/api/user/current", data => {
		console.log(data)
		createNewCommissionObject(data)
	})
}

//Function that creates the request object to be passed to the api
function createNewCommissionObject(userInfo) {
	var newRequest = {
		title: titleInput.val().trim(),
		description: descriptionInput.val().trim(),
		category: categoryInput.val().trim(),
		UserId: userInfo[0].id,
		// tags: tagsInput.val().trim()
	}
	postCommissionRequest(newRequest)
}
//function that passes the new object to the api using a post route
function postCommissionRequest(request) {
	$.post("/api/requests", request, () => {
		console.log(request)
	})
}
