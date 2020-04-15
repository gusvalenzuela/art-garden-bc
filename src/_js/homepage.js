/* eslint-disable no-undef */
$(document).ready(function () {
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
		let formattedDate = moment(request.createdAt).format(`llll`)
		let userFullname = request.firstName + ` ` + request.lastName

		const requestContainer = $(
			`<div class="halign-wrapper" style="width:100%;height:100%;position:static;">`,
		)
			// .append($(`<div class="valign request-card" style="width:100%;">`))
			// .append($(`<div class="container">`))
			// .append($(`<div class="row white-text">`))

		const newRequestCard = $(
			`<div class="col col s12 request-card">`,
		)

		// var newRequestCardName = $(`<div class="valign request-card-name">`)

		const newRequestTitle = $(`<h5 class="request-title" style="font-weight:800;">`).text(request.title)
		const newRequestName = $(`<p class="request-name">`).text(userFullname)
		const newRequestBody = $(`<p class="request-body">`).text(
			request.description,
		)
		const newRequestStats = $(`<p class="request-stats">`).html(
			`<b>Turnaround time:</b> ${request.turnaround_time} hr(s) | <b>Current price of contract:</b> ${request.current_bid} Money | <b>Bid count:</b> ${request.bid_count}`,
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
				request.current_bid - 5
			}">`,
		)
		const bidButton = $(
			`<a class="bid-btn waves-effect waves-light btn-small" data-request-id="${request.id}" data-current-bid="${request.current_bid}" data-bid-count="${request.bid_count}">`,
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
		$(`<hr style="width: 93.339%">`).appendTo(requestContainer)
		requestContainer.appendTo(RequestContainerDeux)

		// change artist id when clicking take request
		$(`.bid-btn`).on(`click`, event => {
			event.stopImmediatePropagation()
			$(`#temp-alert`).remove()
			let requestID = $(event.target).data(`request-id`)
			let bid = $(`#submit-bid-${requestID}`).val()

			if ($(event.target).data(`bid-count`) !== 0 && bid > $(event.target).data(`current-bid`)) {
				let previousElement = $(event.target)[0].previousElementSibling
				$(previousElement).append(
					$(
						`<p id="temp-alert" style="color:black; font-weight:600;">`,
					).text(`Bid cannot be higher than current bid, try again.`),
				)
				setTimeout(() => {
					$(`#temp-alert`).remove()
				}, 4199)

				return
			} else {
				event.stopImmediatePropagation() // prevents the bubblez

				$.ajax({
					url: `/api/requests/${requestID}`,
					method: `PUT`,
					error: () => {
						let previousElement = $(event.target)[0].previousElementSibling
						$(previousElement).append(
							$(
								`<p id="temp-alert" style="color:#990000; font-weight:600;">`,
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
