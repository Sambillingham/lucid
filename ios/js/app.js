$(function() {

	// Do we have accelerometer support?
	if (window.DeviceMotionEvent !== undefined) {

		// Gyrate
		window.ondeviceorientation = function(event) {

			var $marker = $(".marker");

			// Get marker position
			var markerPos = $marker.position();

			// Get compass data
			var deviceDirection = event.alpha,
				deviceRollY 	= event.beta,
				deviceRollX 	= event.gamma;

			// Move marker
			$marker.css({ "top" : deviceRollY, "left" : deviceRollX });

			// Notify for center
			if (markerPos.top === 0 && markerPos.left === 0) {

				$marker.addClass("centered");

			} else {

				if ($marker.hasClass("centered")) {

					$marker.removeClass("centered");

				}

			}

			$(".acc-x").text("X: " + Math.floor(deviceRollX));
			$(".acc-y").text("Y: " + Math.floor(deviceRollY));
			$(".acc-r").text("Rotation: " + Math.floor(deviceDirection));

		}

	} else {

		// We don't have accelerometer support
		$("body").text("No gyro, Bro. Try again in Mobile Safari.");

	}

});
