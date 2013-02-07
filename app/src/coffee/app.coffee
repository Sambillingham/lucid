# Kill stupid 300ms click event delay
window.addEventListener "load", () ->
	new FastClick(document.body)
, false

# Prevent picker scroll weirdness
$("input").blur () ->
	window.scrollTo(0,0)

# Alarm status
alarmIsSet = false

# Form elements
$alarmTime = $("#alarm-time")
$submitButton = $("#alarm-submit")
$cancelButton = $("#alarm-cancel")

# Bind events
$submitButton.bind "click", () ->
	toggleAlarm()
	injectThoughts()

$cancelButton.bind "click", () ->
	toggleAlarm()


# Start alarm
toggleAlarm = () ->

	alarmTime = $alarmTime.val()
	splitAlarmTime = alarmTime.split(":")

	# Get desired time
	hour = parseInt(splitAlarmTime[0])
	mins = parseInt(splitAlarmTime[1])

	if not alarmIsSet # Alarm isn't set. Let's set it.

		# Set alarm
		alarmIsSet = true

		$(".main").fadeOut 1000, ->
			$(".night-mode").fadeIn 1000

		# Check the time, once per second
		window.ticker = setInterval ->
			checkAlarmAgainstTime(hour, mins)
		, 1000

		# Debug
		console.log "Alarm is set for #{hour}:#{mins}"

	else # Alarm is already set. Let's disable it

		# Cancel alarm
		alarmIsSet = false

		# Switch to alarm screen
		$(".night-mode").fadeOut 1000, ->
			$(".main").fadeIn 1000

		# Flip button text
		$submitButton.removeClass("asleep").addClass("awake")

		# Clear
		clearInterval window.ticker

		# Debug
		console.log "Alarm cancelled"



# Check alarm against the current time
checkAlarmAgainstTime = (hour, minutes) ->

	# Get date & time
	date = new Date
	currentHour = date.getHours()
	currentMins = date.getMinutes()

	# Alert on time match
	if hour is currentHour and minutes is currentMins
		alarmComplete()
	else
		console.log "tick"

# Notification events
alarmComplete = () ->

	#Vibrate
	navigator.notification.vibrate 1000

	#Visual notification
	navigator.notification.alert \
		"Wake up, Sheeple",
		toggleAlarm(),
		"Lucid",
		"Dismiss"

injectThoughts = () ->

	# 1 hour
	cycleDuration = 360000

	# Fire at the start of every REM cycle
	setInterval ->
		console.log "Injecting thoughts..."
	, cycleDuration

