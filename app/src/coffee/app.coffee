###
Resets, fixes 'n' shit
###

# Kill stupid 300ms click event delay
window.addEventListener "load", ->
	new FastClick(document.body)
, false

# Prevent picker scroll weirdness
$("input").blur ->
	window.scrollTo(0,0)

###
UI Elements
###

# Alarm status
alarmIsSet = false

# Form elements
$alarmTime = $("#alarm-time")
$submitButton = $("#alarm-submit")
$cancelButton = $("#alarm-cancel")

duration = 10000

###
Bind events
###

$submitButton.bind "click", ->
	toggleAlarm()
	countdownToDeepSleep()
	startMonitoringMovement()

$cancelButton.bind "click", ->
	toggleAlarm()
	stopMonitoringMovement(window.accelerometerMonitor)

###
Alarm Clock logic
###

# Start alarm
toggleAlarm = ->

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

		# Clear alarm ticker
		clearInterval window.ticker

		# Clear deep sleep countdown
		cancelDeepSleepCountdown()

		# Cancel audio player


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
alarmComplete = ->

	#Vibrate
	navigator.notification.vibrate 1000

	#Visual notification
	navigator.notification.alert \
		"Wake up, Sheeple",
		toggleAlarm(),
		"Lucid",
		"Dismiss"

###
Audio player
###

injectThoughts = ->

	# How long between audio clips?
	cycleDuration = 10000

	# Get audio clips
	audioClip = new Media("../www/audio/inception.wav");

	# Play at intervals
	window.audioPlayer = setInterval ->
		console.log "Injecting thoughts..."
		audioClip.play()
	, cycleDuration

###
REM Sleep detection
###

countdownToDeepSleep = ->
	window.countdown = setInterval ->
		duration = duration - 1000
		console.log duration
		if duration is 0
			# We're in deep sleep
			cancelDeepSleepCountdown()
			console.log "We're ready to send audio"
			injectThoughts()
	, 1000


cancelDeepSleepCountdown = ->
	clearInterval window.countdown
	duration = 10000

interruptDeepSleepCountdown = ->
	duration = 10000

###
Watch for movement
###

startMonitoringMovement = ->

	accelerometerSuccess = (acceleration) ->
		if acceleration.x > 1 or acceleration.x < -1 or acceleration.y > 1 or acceleration.y < -1
			console.log "movement!"
			interruptDeepSleepCountdown()

	accelerometerError = ->
		alert "Error watching accelerometer"

	accelerometerOptions = {
		frequency: 100
	}

	# Watch accelerometer and log X value every second
	window.accelerometerMonitor = navigator.accelerometer.watchAcceleration(accelerometerSuccess, accelerometerError, accelerometerOptions)

stopMonitoringMovement = (monitorID) ->
	navigator.accelerometer.clearWatch(monitorID)
