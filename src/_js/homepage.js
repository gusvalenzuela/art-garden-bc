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
		setTimeout(autoplay, 15000)
	}

	// start..
	const activeSession = $(`#main-container`).data(`received-session`)
	const mainRequestContainer = $(".request-container")
	var requests
	const titleInput = $("#title")
	const descriptionInput = $("#description")
	const categoryInput = $("#category")
	const turnAroundTime = $("#turnaround_time")
	const startingPrice = $("#starting-price")
	const tags = $(`#tags`)

	if (activeSession) {
		$(`#nav-signup-btn`).hide()
		$(`#nav-login-btn`).hide()
		$(`#nav-logout-btn`).show()
	}

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
			.format(`lll`)
		// .calendar()
		let userFullname = request.User.firstName + ` ` + request.User.lastName

		const requestContainer = $(
			`<div class="halign-wrapper" style="width:100%;height:100%;position:static;margin-bottom:1.5em;">`,
		)
		const newRequestCardRow = $(`<div class="row valign-center">`)
		// >>
		const newRequestCardRight = $(`<div class="col s12 request-card">`)
		// const newRequestCardLeft = $(`<div class="col s12 m2 request-image" style="padding-top: 3em;">`).append(
		// 	$(`<img src="/userdata/profile/male-1.png" style="height:89px;">`),
		// )

		// var newRequestCardName = $(`<div class="valign request-card-name">`)

		const newRequestTitle = $(
			`<h5 class="request-title" style="font-weight:800;">`,
		).text(request.title)

		const newRequestNameDateRow = $(`<div class="request-namedate row">`)
		const newRequestName = $(`<p class="request-name col left">`).text(
			`Offer by: ${userFullname}`,
		)
		const newRequestDate = $(`<p class="request-date col left">`).text(
			`Created on: ${formattedDate}`,
		)

		// appending two columns to nameDate row
		newRequestNameDateRow.append(newRequestName, newRequestDate)

		const newRequestBody = $(`<p id="${request.id}">`).text(request.description)
		const newRequestBodyRow = $(`<div class="request-body row">`).append(
			newRequestBody,
		)

		const newRequestStatsRow = $(`<div class="request-stats row">`)
		const requestTime = $(`<p class="request-stats-time col left">`).html(
			`<b>Turnaround time:</b> ${request.turnaround_time} hr(s)`,
		)
		const requestPrice = $(`<p class="request-stats-price col left">`).html(
			`<b>Current price of contract:</b> ${request.current_bid} Money`,
		)
		const requestProposalCount = $(
			`<p class="request-stats-proposal-count col left">`,
		).html(`<b>Proposal count:</b> ${request.bid_count}`)

		// appending our columns to Stats row
		newRequestStatsRow.append(requestTime, requestPrice, requestProposalCount)

		// const getInputValue = () => {
		// 	if (request.current_bid > 11) {
		// 		return request.current_bid - 5
		// 	} else if (request.current_bid > 2) {
		// 		return request.current_bid - 1
		// 	} else {
		// 		return 0
		// 	}
		// }
		// const bidInput = $(
		// 	`<input id="submit-bid-${
		// 		request.id
		// 	}" style="width: 7em; text-align:center; margin: 0 1em;" type="number" data-request-id="${
		// 		request.id
		// 	}" data-current-bid="${request.current_bid}" value="${getInputValue()}">`,
		// )
		const proposalButton = $(
			`<a class="proposal-btn waves-effect waves-light btn-small" data-request-id="${request.id}" data-current-bid="${request.current_bid}" data-bid-count="${request.bid_count}">`,
		).text("Make proposal")

		const buttonRow = $(`<div class="request-buttons row">`).append(
			proposalButton,
		)
		// .data("contract-id", request.id)

		newRequestCardRight.append(
			newRequestTitle,
			newRequestNameDateRow,
			newRequestBodyRow,
			newRequestStatsRow,
			// bidInput,
			buttonRow,
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
		$(`.proposal-btn`).on(`click`, event => {
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
							).text(`Feature coming soon!`),
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

	$(`#logo`).on(`click`, () => (window.location.href = `/`))
})
