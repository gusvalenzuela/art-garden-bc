/* eslint-disable no-undef */
$(document).ready(function () {
	const mainRequestContainer = $(".request-container")
	let userRequests
	// let userNames
	const titleInput = $("#title")
	const descriptionInput = $("#description")
	const categoryInput = $("#category")
	const turnAroundTime = $("#turnaround_time")
	const startingPrice = $("#starting-price")
	const tags = $(`#tags`)

	$(document).on("click", ".delete-button", deleteRequest)

	getAllUserRequests()

	function getAllUserRequests() {
		mainRequestContainer.empty()
		$.get("/api/user/current", data => {
			userRequests = data.Requests
			// userName = data.firstName + " " + data.lastName
			// initializeCardCreation()
			if (userRequests.length > 0) {
				initializeCardCreation()
			} else {
				var noRequests = $("<p>").text("You have no requests")
				noRequests.appendTo(mainRequestContainer)
			}
		})
	}

	function initializeCardCreation() {
		mainRequestContainer.empty()

		if (userRequests.length > 0) {
			for (var i = 0; i < userRequests.length; i++) {
				createRequestCards(userRequests[i])
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
		const requestContainer = $(
			`<div class="halign-wrapper" style="width:100%;height:100%;position:static;">`,
		)
		// .append($(`<div class="valign request-card" style="width:100%;">`))
		// .append($(`<div class="container">`))
		// .append($(`<div class="row white-text">`))

		const newRequestCard = $(`<div class="col col s12 request-card">`)

		// var newRequestCardName = $(`<div class="valign request-card-name">`)
		const newRequestTitle = $(
			`<h5 class="request-title" style="font-weight:800;">`,
		).text(request.title)
		const newRequestName = $(`<p class="request-name">`).text(
			`${formattedDate}`,
		)
		const newRequestBody = $(
			`<p class="request-body" id="${request.id}">`,
		).text(request.description)
		const newRequestStats = $(`<p class="request-stats">`).html(
			`<b>Turnaround time:</b> ${request.turnaround_time} hr(s) | <b>Current price of contract:</b> ${request.current_bid} Money | <b>Bid count:</b> ${request.bid_count}`,
		)

		const deleteRequestButton = $(
			`<a class="delete-button waves-effect waves-light btn-small">`,
		)
			.text("Delete contract")
			.data("contract-id", request.id)

		newRequestCard.append(
			newRequestTitle,
			newRequestName,
			// newRequestPostDate,
			newRequestStats,
			newRequestBody,
			// newRequestPrice,
			deleteRequestButton,
		)

		requestContainer.append(newRequestCard)
		$(`<hr style="width: 93.339%" class="request-divider">`).appendTo(
			requestContainer,
		)
		requestContainer.appendTo(mainRequestContainer)
	}

	function deleteRequest() {
		var requestId = $(this).data("contract-id")
		var requestUrl = "/api/requests/" + requestId
		$.ajax({
			url: requestUrl,
			method: "DELETE",
		}).then(() => {
			getAllUserRequests()
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
		// console.log(`the new request is: `, newRequest)

		$.post(`/api/requests`, newRequest, () => {
			window.location.href = "/profile"
		})
	})

	// change artist id when clicking take request
	$(`.bid-btn`).on(`click`, event => {
		event.preventDefault()
		let requestID = $(event.target).data(`request-id`)
		let bid = $(`#submit-bid-${requestID}`).val()

		// find id of request and user id of taker
		$.ajax({
			url: `/api/requests/` + requestID,
			method: `PUT`,
			data: { current_bid: bid },
		}).then(() => {
			window.location.href = "/grvtest"
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
