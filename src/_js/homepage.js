/* eslint-disable no-undef */
$(document).ready(function () {
	// var requestContainer = $(".request-container")
	var RequestContainerDeux = $(".request-container")
	var requests

	getCommissionRequests()

	//This function creates an ajax call to the artGarden API's requests table
	function getCommissionRequests() {
		RequestContainerDeux.empty()
		$.get("/api/requests", data => {
			console.log(data)
			requests = data
			initializeCardCreation()
		})
	}

	//This function initializes the creation of cards based on the number of requests in the requests var
	function initializeCardCreation() {
		RequestContainerDeux.empty()
		for (var i = 0; i < requests.length; i++) {
			createRequestCards(requests[i])
		}
	}

	function createRequestCards(request) {
		RequestContainerDeux.empty()
		let formattedDate = moment(request.createdAt).format(
			"MMMM Do YYYY, h:mm:ss a",
		)

		const requestContainer = $(
			`<div class="halign-wrapper" style="width:100%;height:100%;position:static;padding: 0px;">`,
		)
			.append($(`<div class="valign request-card" style="width:100%;">`))
			.append($(`<div class="container">`))
			.append($(`<div class="row white-text">`))

		const newRequestCard = $(
			`<div class="col col s12 light-green request-card">`,
		)

		// var newRequestCardName = $(`<div class="valign request-card-name">`)

		const newRequestTitle = $(`<h5 class="request-title">`).text(request.title)
		const newRequestName = $(`<p class="request-name">`).text(`Username`)
		const newRequestBody = $(`<p class="request-body">`).text(
			request.description,
		)
		const newRequestPostDate = $(`<p class="request-post-date">`).text(
			formattedDate,
		)

		const deleteRequestButton = $(
			`<a class="delete-button waves-effect waves-light btn-small">`,
		)
			.text("Delete contract")
			.data("contract-id", request.id)

		newRequestCard.append(
			newRequestTitle,
			newRequestName,
			newRequestBody,
			newRequestPostDate,
			deleteRequestButton,
			$(`<br>`),
			$(`<br>`),
		)

		newRequestCard.appendTo(requestContainer)
		requestContainer.appendTo(RequestContainerDeux)
	}

	// //This function creates cards for the passed in requests from the requests var
	// function createRequestCards(request) {
	// 	var formattedDate = new Date(request.createdAt)
	// 	formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a")

	// 	var newRequestCard = $("<div>")
	// 	newRequestCard.addClass("request-card")

	// 	var newRequestCardName = $("<div>")
	// 	newRequestCardName.addClass("request-card-name")

	// 	var newRequestName = $("<p>").addClass("request-name").text(request.name)
	// 	newRequestName.appendTo(newRequestCardName)

	// 	var newRequestCardTitle = $("<div>")
	// 	newRequestCardTitle.addClass("request-card-title")

	// 	var newRequestTitle = $("<p>").addClass("request-title").text(request.title)
	// 	newRequestTitle.appendTo(newRequestCardTitle)

	// 	var newRequestCardBody = $("<div>")
	// 	newRequestCardBody.addClass("request-card-body")

	// 	var newRequestBody = $("<p>")
	// 		.addClass("request-body")
	// 		.text(request.description)
	// 	newRequestBody.appendTo(newRequestCardBody)

	// 	var newRequestCardPostDate = $("<div>")
	// 	newRequestCardPostDate.addClass("request-card-postdate")

	// 	var newRequestPostDate = $("<p>")
	// 		.addClass("request-postdate")
	// 		.text(formattedDate)
	// 	newRequestPostDate.appendTo(newRequestCardPostDate)

	// 	newRequestCard.append(
	// 		newRequestCardTitle,
	// 		newRequestCardName,
	// 		newRequestCardBody,
	// 		newRequestCardPostDate,
	// 	)

	// 	newRequestCard.appendTo(requestContainer)
	// }

	// function getFilteredArtists(){
	// 	artistContainer.empty()
	// 	$.get("/api/artwork/")
	// }
})
