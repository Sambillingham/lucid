public var motor : CharacterController;
public var sight : GameObject;
public var step  : AudioSource;
private var sightTo : Vector3;
private var rotateBy : float = 0f;
public var walkSpeed : float = 10f;
public var turnSpeed : float = 3f;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterController);
	sightTo = Vector3.zero;
}

function Update () {

	var keyRotation:float = Input.GetAxis("Horizontal");
	if (keyRotation != 0) rotateBy = keyRotation;
	motor.SimpleMove(Input.GetAxis("Vertical") * transform.forward * walkSpeed);

	sight.transform.localRotation = Quaternion.Slerp(sight.transform.localRotation, Quaternion.Euler(sightTo), Time.deltaTime);
	transform.Rotate(0,rotateBy * turnSpeed,0, Space.World);

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
	
	motor.SimpleMove((transform.forward * directionVector.z) * walkSpeed);

}

public function AdjustPlayerRotation (amount:float) :void {
	rotateBy = amount;
}

public function AdjustSight (rotationVector:Vector3) :void {
	//sightTo = Quaternion.Euler(rotationVector);
	sightTo = new Vector3(-50.0 + rotationVector.x, rotationVector.y * 100.0, rotationVector.z);
}
