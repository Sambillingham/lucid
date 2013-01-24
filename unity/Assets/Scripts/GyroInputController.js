private var motor : CharacterMotor;
public var sight : GameObject;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	sight = GameObject.Find("Player/Sight");
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

public function RotatePlayer (amount:float) :void {
	gameObject.transform.Rotate(0,amount,0);
}

public function AdjustSight (rotationVector:Vector3) :void {
	sight.transform.localEulerAngles = rotationVector;
}
