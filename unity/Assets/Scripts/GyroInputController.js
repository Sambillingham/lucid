public var motor : CharacterController;
public var sight : GameObject;
private var sightTo : Vector3;
private var rotateBy : float = 0f;
public var walkSpeed : float = 10f;
public var turnSpeed : float = 3f;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterController);
	sight = gameObject;
	camRotation = sight.transform.rotation;
}

function Update () {

	// Get the input vector from kayboard or analog stick
	var keyRotation:float = Input.GetAxis("Horizontal");
	if (keyRotation != 0) rotateBy = keyRotation;
	motor.SimpleMove(Input.GetAxis("Vertical") * transform.forward * walkSpeed);

	//gameObject.transform.RotateAround(transform.position, new Vector3(0,1,0), Time.deltaTime * rotateBy);
	//gameObject.transform.rotation = Quaternion.Slerp(gameObject.transform.rotation, Quaternion.Euler(gameObject.transform.rotation.x, gameObject.transform.rotation.y + rotateBy, gameObject.transform.rotation.z), Time.deltaTime * rotateBy);
	gameObject.transform.Rotate(0,rotateBy * turnSpeed,0);
	sight.transform.Rotate(-Input.GetAxis("Mouse Y"), Input.GetAxis("Mouse X"), 0, Space.Self);
	//Debug.Log(Input.GetAxis("Mouse Y") + ", " + Input.GetAxis("Mouse X"));
	//sight.transform.Rotate(sightTo.x, sightTo.y, sightTo.z);
	//sight.transform.localRotation = Quaternion.Slerp(sight.transform.localRotation, sightTo, Time.deltaTime);
	Debug.DrawRay(transform.position, transform.forward * 100, Color.green);
	Debug.DrawRay(sight.transform.position + new Vector3(0,-5,0), sight.transform.forward * 10, Color.blue);
}

// Update is called once per frame
public function UpdatePlayerPosition (directionVector:Vector3) :void {

	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
	}
	
	// Apply the direction to the CharacterMotor
	
	motor.SimpleMove((transform.forward * directionVector.z) * walkSpeed);
	//motor.inputMoveDirection = transform.rotation * directionVector;

}

public function AdjustPlayerRotation (amount:float) :void {
	rotateBy = amount;
}

public function AdjustSight (rotationVector:Vector3) :void {
	//sightTo = Quaternion.Euler(rotationVector);
	sightTo = rotationVector * Time.deltaTime;
}
