/* eslint-disable no-undef */

$(document).ready(function () {
	var newProfileImage
	var bio
	var location
	var userId

	var submitButton = $("#submit-button")

	var img1 = $("#image-1")
	$("#image-1").data("imagePath", "female-long-hair-3.png")

	var img2 = $("#image-2")
	$("#image-2").data("imagePath", "female-long-hair-2.png")

	var img3 = $("#image-3")
	$("#image-3").data("imagePath", "male-beard-4.png")

	var img4 = $("#image-4")
	$("#image-4").data("imagePath", "male-blue-1.png")
	var img5 = $("#image-5")
	$("#image-5").data("imagePath", "female-2.png")
	var img6 = $("#image-6")
	$("#image-6").data("imagePath", "male-1.png")
	var img7 = $("#image-7")
	$("#image-7").data("imagePath", "male-2.png")
	var img8 = $("#image-8")
	$("#image-8").data("imagePath", "female-1.png")
	// var img9 = $("#image-9")
	// $("#image-9").data("imagePath", "female-2.png")

	$(".profile-image").on("click", handleATagPress)

	submitButton.on("click", handleSubmitButtonPress)

	function handleATagPress() {
		img1.removeClass("selected")
		img2.removeClass("selected")
		img3.removeClass("selected")
		img4.removeClass("selected")
		img5.removeClass("selected")
		img6.removeClass("selected")
		img7.removeClass("selected")
		img8.removeClass("selected")
		// img9.removeClass("selected")
		$(this).addClass("selected")
		var image = $(this).data("imagePath")
		newProfileImage = image
		// console.log(newProfileImage)
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
	}

	function bioInfo(data) {
		var bioInput = $("#bio").val().trim()
		if (bioInput == "") {
			bio = data.Userdetail.bio_statement
		} else {
			bio = bioInput
		}
	}

	function handleSubmitButtonPress() {
		$.get("/api/user/current", data => {
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
