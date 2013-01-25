private var motor : CharacterMotor;
public var sight : GameObject;
private var sightTo : Quaternion;
private var rotateBy : float = 0f;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	sight = GameObject.Find("Player/Sight");
	camRotation = sight.transform.rotation;
}

function Update () {
	gameObject.transform.RotateAround(transform.position, new Vector3(0,1,0), Time.deltaTime * rotateBy);
	// gameObject.transform.rotation = Quaternion.Slerp(gameObject.transform.rotation, Quaternion.Euler(gameObject.transform.rotation.x, gameObject.transform.rotation.y + rotateBy, gameObject.transform.rotation.z), Time.deltaTime * rotateBy);
	sight.transform.localRotation = Quaternion.Slerp(sight.transform.localRotation, sightTo, Time.deltaTime);
	// Debug.DrawRay (transform.position, transform.rotation.eulerAngles, Color.blue);
	Debug.DrawRay(transform.position, transform.forward * 100, Color.green);
	Debug.DrawRay(sight.transform.position + new Vector3(0,-1,0), sight.transform.forward * 10, Color.blue);
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
	motor.inputMoveDirection = transform.rotation * directionVector;

}

public function AdjustPlayerRotation (amount:float) :void {
	rotateBy = amount;
}

public function AdjustSight (rotationVector:Vector3) :void {
	sightTo = Quaternion.Euler(rotationVector);
}
