/* eslint-disable no-undef */

$(document).ready(function () {
	var newProfileImage
	var bio
	var location
	var userId

	var submitButton = $("#submit-button")

	var img1 = $("#image-one")
	$("#image-one").data("imagePath", "female-long-hair-1.jpg")

	var img2 = $("#image-two")
	$("#image-two").data("imagePath", "female-long-hair-2.png")

	var img3 = $("#image-three")
	$("#image-three").data("imagePath", "male-beard-1.png")

	var img4 = $("#image-four")
	$("#image-four").data("imagePath", "male-blue-2.png")

	$(".profile-image").on("click", handleATagPress)

	submitButton.on("click", handleSubmitButtonPress)

	function handleATagPress() {
		img1.removeClass("selected")
		img2.removeClass("selected")
		img3.removeClass("selected")
		img4.removeClass("selected")
		$(this).addClass("selected")
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
			window.location.href = "/profile"
		})
	}
})
