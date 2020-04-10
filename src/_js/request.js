/* eslint-disable no-undef */
$(document).ready(function () {
	var newCommissionRequestForm = $("#new-commission-request-form")

	var titleInput = $("#title")
	var descriptionInput = $("#description")
	var categoryInput = $("#category")

	//Event listener for the commission request form
	newCommissionRequestForm.on("submit", userInfo)
	//Function that gets the user's info and passes that to the new object to post
	function userInfo(event) {
		event.preventDefault()
		$.get("/api/users", data => {
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
			requestor_id: userInfo[0].id,
		}
		postCommissionRequest(newRequest)
	}
	//function that passes the new object to the api using a post route
	function postCommissionRequest(request) {
		$.post("/api/requests", request, () => {
			window.location.href = "/profile"
		})
	}
})
