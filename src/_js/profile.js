/* eslint-disable no-undef */
$(document).ready(function () {
	//Function that collects user info

	var passport = require("passport-local")

	var newCommissionRequestForm = $("new-commission-request-form")

	var user = function () {
		passport.authenticate("local"),
			function (req) {
				console.log(req.user)
			}
	}

	console.log(user)

	var titleInput = $("#title")
	var descriptionInput = $("#description")
	var categoryInput = $("#category")
	var requestorId = $("#")

	newCommissionRequestForm.on("submit", createNewCommisionRequest)

	function createNewCommisionRequest(event) {
		event.preventDefault()

		var newRequest = {
			title: titleInput.val().trim(),
			description: descriptionInput.val().trim(),
			category: categoryInput.val().trim(),
			requestor_id: requestorId.id,
		}
		postCommissionRequest(newRequest)
	}

	function postCommissionRequest(request) {
		$.post("/api/requests", request, () => {
			window.location.href = "/profile"
		})
	}
})
