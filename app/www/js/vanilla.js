window.addEventListener("load", function() {
	new FastClick(document.body);
});

$("input").blur(function(){
	window.scrollTo(0,0);
});

// Form elements

var alarmIsSet = false;

var ticker;

var $alarmTime = $("#alarm-time");
var $submitButton = $("#alarm-submit");
var $cancelButton = $("#alarm-cancel");

// Bind events

$submitButton.bind("click", function() {
	toggleAlarm();
});

$cancelButton.bind("click", function() {
	toggleAlarm();
});

// Alarm clock

var toggleAlarm = function() {

	var alarmTime = $alarmTime.val();
	var splitAlarmTime = alarmTime.split(":");

	var hour = parseInt(splitAlarmTime[0]);
	var mins = parseInt(splitAlarmTime[1]);

	if (!alarmIsSet) {

		// Alarm is not set. Let's set it

		alarmIsSet = true;

		$(".main").fadeOut(1000, function() {
			$(".night-mode").fadeIn(1000);
		});

		ticker = setInterval(function(){
			checkAlarmAgainstTime(hour, mins);
		}, 1000);

		console.log("alarm is set for " + hour + mins);

	} else {

		// alarm is already set. Let's stop it.

		alarmIsSet = false;

		$(".night-mode").fadeOut(1000, function() {
			$(".main").fadeIn(1000);
		});

		clearInterval(ticker);

		console.log("Alarm cancelled");

	}

}

var checkAlarmAgainstTime = function(hour, minutes) {

	var date = new Date;
	var currentHour = date.getHours();
	var currentMins = date.getMinutes();

	// Alert on match

	if (hour === currentHour && minutes === currentMins) {

		alarmComplete();

	} else {

		console.log("tick");

	}

}

var alarmComplete = function() {

	navigator.notification.vibrate(1000);

	navigation.notification.alert(
		"Wake up, Sheeple",
		toggleAlarm(),
		"Lucid",
		"Dismiss"
	);

}












