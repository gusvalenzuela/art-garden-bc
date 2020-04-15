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
		const newRequestTATime = $(`<p class="request-time">`).html(
			`<b>Turnaround time:</b> ${request.turnaround_time} | <b>Current price of contract:</b> ${request.current_bid} | <b>Bid count:</b> ${request.bid_count}`,
		)
		const newRequestPostDate = $(`<p class="request-post-date">`).text(
			formattedDate,
		)
		const bidInput = $(
			`<input id="submit-bid-${request.id}" style="width: auto;" type="number" data-request-id="${request.id}">`,
		)
		const bidButton = $(
			`<a class="bid-btn waves-effect waves-light btn-small" data-request-id="${request.id}">`,
		).text("Bid")
		// .data("contract-id", request.id)

		newRequestCard.append(
			newRequestTitle,
			newRequestName,
			newRequestBody,
			newRequestTATime,
			newRequestPostDate,
			bidInput,
			bidButton,
			$(`<br>`),
			$(`<br>`),
		)

		newRequestCard.appendTo(requestContainer)
		requestContainer.appendTo(RequestContainerDeux)

		// change artist id when clicking take request
		$(`.bid-btn`).on(`click`, event => {
			event.preventDefault()
			let requestID = $(event.target).data(`request-id`)
			let bid = $(`#submit-bid-${requestID}`).val()

			console.log($(this))

			// // find id of request and user id of taker
			// $.ajax({
			// 	url: `/api/requests/` + requestID,
			// 	method: `PUT`,
			// 	data: { current_bid: bid },
			// }).then(() => {
			// 	window.location.href = "/grvtest"
			// })
		})
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
