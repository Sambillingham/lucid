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
duration = 1800000
audioIncrement = 0

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
		clearInterval window.audioPlayer

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

	audioClips = [
		"../www/audio/clue_triangle_a.mp3",
		"../www/audio/clue_triangle_b.mp3",
		"../www/audio/clue_descriptive.mp3"
		"../www/audio/musical_complete.mp3",
		"../www/audio/musical_bass.mp3",
		"../www/audio/musical_drums.mp3",
		"../www/audio/musical_guitar.mp3",
		"../www/audio/musical_organ.mp3",
	]

	# How long between audio clips?
	cycleDuration = 600000

	i = 0
	window.audioPlayer = setInterval ->
		if i < audioClips.length
			window.clip = new Media(audioClips[i])
			window.clip.play()
			i++
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
	duration = 1800000

interruptDeepSleepCountdown = ->
	# Clear deep sleep countdown
	clearInterval window.countdown
	# Reset countdown timer
	duration = 1800000
	# Stop playing audio if we're doing that
	clearInterval window.audioPlayer

	if typeof window.clip isnt "undefined"
		window.clip.stop()

	# Kick back to deep sleep countdown
	countdownToDeepSleep()

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
