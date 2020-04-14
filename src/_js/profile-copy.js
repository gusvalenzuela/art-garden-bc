/* eslint-disable no-undef */
$(document).ready(function () {
	const userRequestContainer = $(".user-request-container")
	let userRequests
	let userName

	$(document).on("click", ".delete-button", deleteRequest)

	getAllUserRequests()

	function getAllUserRequests() {
		userRequestContainer.empty()
		$.get("/api/user/current", data => {
			console.log(`current users data`, data)
			userRequests = data.Requests
			userName = data.firstName + " " + data.lastName
			console.log(userRequests)
			initializeCardCreation()
		})
	}

	function initializeCardCreation() {
		userRequestContainer.empty()

		if (userRequests) {
			for (var i = 0; i < userRequests.length; i++) {
				createRequestCards(userRequests[i])
			}
		}
	}

	function createRequestCards(request) {
		var formattedDate = new Date(request.createdAt)
		formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a")

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
		const newRequestName = $(`<p class="request-name">`).text(userName)
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
		requestContainer.appendTo(userRequestContainer)
	}

	function deleteRequest() {
		var requestId = $(this).data("contract-id")
		var requestUrl = "/api/requests/" + requestId
		console.log(URL)
		$.ajax({
			url: requestUrl,
			method: "DELETE",
		}).then(() => {
			getAllUserRequests()
		})
	}

	$(`#req-form`).on(`submit`, e => {
		e.preventDefault()

		let newRequest = {
			title: $(`#title`).val(),
			description: $(`#description`).val(),
			category: $(`#category`).val(),
			tags: $(`#tags`).val(),
			turnaround_time: 2,
			UserId: $(`#req-form`).data(`user-id`),
		}

		console.log(`the new request is: `, newRequest)

		$.post(`/api/requests`, newRequest, () => {
			window.location.href = "/profile"
		})
	})
})
