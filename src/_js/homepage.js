/* eslint-disable no-undef */
$(document).ready(function () {
	// banner carousel 
	$(".carousel").carousel({
		dist: 0,
		padding: 0,
		fullWidth: true,
		indicators: false,
		duration: 100,
	})

	autoplay()

	function autoplay() {
		$(".carousel").carousel("next")
		setTimeout(autoplay, 4500)
	}

	// start 
	const mainRequestContainer = $(".request-container")
	var requests
	const titleInput = $("#title")
	const descriptionInput = $("#description")
	const categoryInput = $("#category")
	const turnAroundTime = $("#turnaround_time")
	const startingPrice = $("#starting-price")
	const tags = $(`#tags`)

	getCommissionRequests()

	//This function creates an ajax call to the artGarden API's requests table
	function getCommissionRequests() {
		mainRequestContainer.empty()
		$.get("/api/requests", data => {
			requests = data
			// initializeCardCreation()
			if (requests.length > 0) {
				initializeCardCreation()
			} else {
				var noRequests = $("<p>").text("There are no requests")
				noRequests.appendTo(mainRequestContainer)
			}
		})
	}

	//This function initializes the creation of cards based on the number of requests in the requests var
	function initializeCardCreation() {
		mainRequestContainer.empty()
		if (requests.length > 0) {
			for (var i = 0; i < requests.length; i++) {
				createRequestCards(requests[i])
			}
			let arrayOfReqDividers = $(`.request-divider`)
			// removing the last request's hr divider as we're appending one to bottom of each request card
			arrayOfReqDividers[arrayOfReqDividers.length - 1].remove()
		}
	}

	function createRequestCards(request) {
		let formattedDate = moment(request.createdAt)
			// .format("MMMM Do YYYY, h:mm:ss a")
			// .format(`ll`)
			.calendar()
		let userFullname = request.User.firstName + ` ` + request.User.lastName

		const requestContainer = $(
			`<div class="halign-wrapper" style="width:100%;height:100%;position:static;">`,
		)
		// .append($(`<div class="valign request-card" style="width:100%;">`))
		// .append($(`<div class="container">`))
		// .append($(`<div class="row white-text">`))

		const newRequestCardRow = $(`<div class="row valign-center">`)
		const newRequestCardRight = $(`<div class="col s12 request-card">`)
		// const newRequestCardLeft = $(`<div class="col s12 m2 request-image" style="padding-top: 3em;">`).append(
		// 	$(`<img src="/userdata/profile/male-1.png" style="height:89px;">`),
		// )

		// var newRequestCardName = $(`<div class="valign request-card-name">`)

		const newRequestTitle = $(
			`<h5 class="request-title" style="font-weight:800;">`,
		).text(request.title)
		const newRequestName = $(`<p class="request-name">`).text(
			`Made by: ${userFullname}, ${formattedDate}`,
		)
		const newRequestBody = $(
			`<p class="request-body" id="${request.id}">`,
		).text(request.description)
		const newRequestStats = $(`<p class="request-stats">`).html(
			`<b>Turnaround time:</b> ${request.turnaround_time} hr(s) | <b>Current price of contract:</b> ${request.current_bid} Money | <b>Bid count:</b> ${request.bid_count}`,
		)
		// const newRequestPostDate = $(`<p class="request-post-date">`).text(
		// 	formattedDate,
		// )
		const getInputValue = () => {
			if (request.current_bid > 11) {
				return request.current_bid - 5
			} else if (request.current_bid > 2) {
				return request.current_bid - 1
			} else {
				return 0
			}
		}
		const bidInput = $(
			`<input id="submit-bid-${
				request.id
			}" style="width: 7em; text-align:center; margin: 0 1em;" type="number" data-request-id="${
				request.id
			}" data-current-bid="${request.current_bid}" value="${getInputValue()}">`,
		)
		const bidButton = $(
			`<a class="bid-btn waves-effect waves-light btn-small" data-request-id="${request.id}" data-current-bid="${request.current_bid}" data-bid-count="${request.bid_count}">`,
		).text("Bid")
		// .data("contract-id", request.id)

		newRequestCardRight.append(
			newRequestTitle,
			newRequestName,
			// newRequestPostDate,
			newRequestStats,
			newRequestBody,
			bidInput,
			bidButton,
		)

		newRequestCardRow.append(
			// newRequestCardLeft,
			newRequestCardRight,
		)

		newRequestCardRow.appendTo(requestContainer)
		$(`<hr style="width: 93.339%" class="request-divider">`).appendTo(
			requestContainer,
		)
		requestContainer.appendTo(mainRequestContainer)

		// change artist id when clicking take request
		$(`.bid-btn`).on(`click`, event => {
			event.stopImmediatePropagation()
			$(`#temp-alert`).remove()

			let requestID = $(event.target).data(`request-id`)
			let bid = $(`#submit-bid-${requestID}`).val()
			let elementToAppendAlert = $(`#${requestID}`)[0]

			if (bid < 0) {
				$(elementToAppendAlert).append(
					$(`<p id="temp-alert" style="color:#990000; font-weight:600;">`).text(
						`Bid must be a positive integer. Try again.`,
					),
				)
				setTimeout(() => {
					$(`#temp-alert`).remove()
				}, 4199)

				return
			}

			if (
				$(event.target).data(`bid-count`) !== 0 &&
				bid > $(event.target).data(`current-bid`)
			) {
				$(elementToAppendAlert).append(
					$(`<p id="temp-alert" style="color:#990000; font-weight:600;">`).text(
						`Bid cannot be higher than current price of contract. Try again.`,
					),
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
						$(elementToAppendAlert).append(
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

	$(`#open-more`).on(`click`, event => {
		event.preventDefault()
		let content = event.target.nextElementSibling
		if (content.style.display === `block`) {
			content.style.display = `none`
		} else {
			content.style.display = `block`
		}
	})

	$(`#req-form`).on(`submit`, e => {
		e.preventDefault()

		//creates the request object to be passed to the api
		var newRequest = {
			title: titleInput.val().trim(),
			description: descriptionInput.val().trim(),
			category: categoryInput.val().trim(),
			turnaround_time: turnAroundTime.val().trim(),
			starting_price: startingPrice.val().trim(),
			UserId: $(`#req-form`).data(`user-id`),
			tags: tags.val().trim(),
			current_bid: startingPrice.val().trim(),
		}

		$.post(`/api/requests`, newRequest, () => {
			window.location.href = "/profile"
		})
	})

	const resetRequestForm = () => {
		titleInput.val(``)
		descriptionInput.val(``)
		categoryInput[0].options.selectedIndex = 0
		turnAroundTime.val(`24`)
		startingPrice.val(`7`)
		tags.val(``)
	}

	$(`#reset-request-form`).on(`click`, e => {
		e.preventDefault()

		resetRequestForm()
	})
})
