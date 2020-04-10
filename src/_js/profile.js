/* eslint-disable no-undef */
$(document).ready(function () {
	// var profileImage

	var userRequestContainer = $(".user-request-container")
	var userRequests
	var userName

	getAllUserRequests()

	function getAllUserRequests() {
		userRequestContainer.empty()
		$.get("/api/user/current", data => {
			console.log(data)
			userRequests = data.Requests
			userName = data.firstName + " " + data.lastName
			initializeCardCreation()
		})
		console.log(userRequests)
	}

	function initializeCardCreation() {
		userRequestContainer.empty()
		for (var i = 0; i < userRequests.length; i++) {
			createRequestCards(userRequests[i])
		}
	}

	function createRequestCards(request) {
		var formattedDate = new Date(request.createdAt)
		formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a")

		var newRequestCard = $("<div>")
		newRequestCard.addClass("request-card")

		var newRequestCardName = $("<div>")
		newRequestCardName.addClass("request-card-name")

		var newRequestName = $("<p>").addClass("request-name").text(userName)
		newRequestName.appendTo(newRequestCardName)

		var newRequestCardTitle = $("<div>")
		newRequestCardTitle.addClass("request-card-title")

		var newRequestTitle = $("<p>").addClass("request-title").text(request.title)
		newRequestTitle.appendTo(newRequestCardTitle)

		var newRequestCardBody = $("<div>")
		newRequestCardBody.addClass("request-card-body")

		var newRequestBody = $("<p>")
			.addClass("request-body")
			.text(request.description)
		newRequestBody.appendTo(newRequestCardBody)

		var newRequestCardPostDate = $("<div>")
		newRequestCardPostDate.addClass("request-card-postdate")

		var newRequestPostDate = $("<p>")
			.addClass("request-postdate")
			.text(formattedDate)
		newRequestPostDate.appendTo(newRequestCardPostDate)

		newRequestCard.append(
			newRequestCardTitle,
			newRequestCardName,
			newRequestCardBody,
			newRequestCardPostDate,
		)

		newRequestCard.appendTo(userRequestContainer)
	}
})
