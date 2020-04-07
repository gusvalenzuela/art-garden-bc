/* eslint-disable no-undef */
$(document).ready(function () {
	var requestContainer = $(".request-container")
	var requests
	// var user

	getCommissionRequests()

	//This function creates an ajax call to the artGarden API's requests table
	function getCommissionRequests() {
		requestContainer.empty()
		$.get("/api/requests", data => {
			console.log(data)
			requests = data
			initializeCardCreation()
		})
	}

	//This function initializes the creation of cards based on the number of requests in the requests var
	function initializeCardCreation() {
		requestContainer.empty()
		for (var i = 0; i < requests.length; i++) {
			createRequestCards(requests[i])
		}
	}

	//This function creates cards for the passed in requests from the requests var
	function createRequestCards(request) {
		var formattedDate = new Date(request.createdAt)
		formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a")

		var newRequestCard = $("<div>")
		newRequestCard.addClass("request-card")

		var newRequestCardTitle = "<div>"
		newRequestCardTitle.addClass("request-card-title")

		var newRequestTitle = "<p>".addClass("request-title").text(request.title)
		newRequestTitle.appendTo(newRequestCardTitle)

		var newRequestCardBody = "<div>"
		newRequestBody.addClass("request-card-body")

		var newRequestBody = "<p>"
			.addClass("request-body")
			.text(request.description)
		newRequestBody.appendTo(newRequestCardBody)

		var newRequestCardPostDate = $("<div>")
		newRequestPostDate.addClass("request-card-postdate")

		var newRequestPostDate = $("<p>")
			.addClass("request-postdate")
			.text(formattedDate)
		newRequestPostDate.appendTo(newRequestCardPostDate)

		newRequestCard.append(
			newRequestCardTitle,
			newRequestCardBody,
			newRequestCardPostDate,
		)

		newRequestCard.appendTo(requestContainer)
	}

	//We want this function to track the current user's data
})
