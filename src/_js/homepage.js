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
		const newRequestStats = $(`<p class="request-stats">`).html(
			`<b>Turnaround time:</b> ${request.turnaround_time} | <b>Current price of contract:</b> ${request.current_bid} | <b>Bid count:</b> ${request.bid_count}`,
		)
		const newRequestPostDate = $(`<p class="request-post-date">`).text(
			formattedDate,
		)
		const bidInput = $(
			`<input id="submit-bid-${
				request.id
			}" style="width: auto; text-align:center;" type="number" data-request-id="${
				request.id
			}" data-current-bid="${request.current_bid}" value="${
				request.current_bid - 1
			}">`,
		)
		const bidButton = $(
			`<a class="bid-btn waves-effect waves-light btn-small" data-request-id="${request.id}" data-current-bid="${request.current_bid}">`,
		).text("Bid")
		// .data("contract-id", request.id)

		newRequestCard.append(
			newRequestTitle,
			newRequestName,
			newRequestBody,
			newRequestStats,
			newRequestPostDate,
			bidButton,
			bidInput,
		)

		newRequestCard.appendTo(requestContainer)
		requestContainer.appendTo(RequestContainerDeux)

		// change artist id when clicking take request
		$(`.bid-btn`).on(`click`, event => {
			$(`#temp-alert`).remove()
			let requestID = $(event.target).data(`request-id`)
			let bid = $(`#submit-bid-${requestID}`).val()

			if (bid > $(event.target).data(`current-bid`)) {
				let parentElement = $(event.target)[0].parentElement
				$(parentElement).append(
					$(
						`<span id="temp-alert" style="color:black; font-weight:600;">`,
					).text(`Bid is too high`),
				)
				setTimeout(() => {
					$(`#temp-alert`).remove()
				}, 4000)

				return
			} else {
				event.stopImmediatePropagation() // prevents the bubblez

				$.ajax({
					url: `/api/requests/${requestID}`,
					method: `PUT`,
					error: () => {
						let parentElement = $(event.target)[0].parentElement
						$(parentElement).append(
							$(
								`<span id="temp-alert" style="color:black; font-weight:600;">`,
							).text(`Sorry, only registered users are able to bid`),
						)
						setTimeout(() => {
							$(`#temp-alert`).remove()
						}, 4000)
					},
					data: { current_bid: bid },
					success: () => (window.location.href = "/homepage"),
				})
			}
		})
	}

	// const bidError = target => {
	// 	let parentElement = $(target)[0].parentElement
	// 	$(parentElement).append(
	// 		$(`<span id="temp-alert" style="color:black; font-weight:600;">`).text(
	// 			`Sorry, only registered users are able to bid`,
	// 		),
	// 	)
	// 	setTimeout(() => {
	// 		$(`#temp-alert`).remove()
	// 	}, 5000)
	// }
})
