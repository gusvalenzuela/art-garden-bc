/* eslint-disable no-undef */

$(document).ready(function () {
	var newProfileImage

	var aTags = $("a")
	var submitButton = $("#submit-button")
	var bio
	var location
	var userId

	$("#image-one").data("imagePath", "female-long-hair-1.jpg")

	$("#image-two").data("imagePath", "female-long-hair-2.png")

	$("#image-three").data("imagePath", "male-beard-1.png")

	$("#image-four").data("imagePath", "male-blue-2.png")

	aTags.on("click", handleATagPress)

	submitButton.on("click", handleSubmitButtonPress)

	// function getUserData() {
	// 	$.get("/api/user/current", data => {
	// 		console.log(data)
	// 		userId = data.id
	// 	})
	// }

	function handleATagPress(event) {
		event.preventDefault()
		var image = $(this).data("imagePath")
		newProfileImage = image
		console.log(newProfileImage)
	}

	function locationInfo(data) {
		var city = $("#location-city").val().trim()
		var state = $("#location-state").val().trim()
		if (city && state) {
			location = city + ", " + state
		} else if (city) {
			location = city
		} else if (state) {
			location = state
		} else {
			location = data.Userdetail.location
		}
		console.log(location)
	}

	function bioInfo(data) {
		var bioInput = $("#bio").val().trim()
		if (bioInput == "") {
			bio = data.Userdetail.bio_statement
		} else {
			bio = bioInput
		}
		console.log(bio)
	}

	function handleSubmitButtonPress() {
		$.get("/api/user/current", data => {
			console.log(data)
			// console.log(data.Userdetail.bio_statement)
			// console.log(data.id)
			userId = data.id
			bioInfo(data)
			locationInfo(data)
			createUpdateObj()
		})
	}

	function createUpdateObj() {
		var profileUpdate = {
			profileImg: newProfileImage,
			bio_statement: bio,
			location: location,
		}
		submitChanges(profileUpdate)
	}

	function submitChanges(obj) {
		$.ajax({
			method: "PUT",
			url: "/api/userdetails/" + userId,
			data: obj,
		}).then(() => {
			alert("success")
		})
	}
})
