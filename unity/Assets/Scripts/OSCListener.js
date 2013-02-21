
private var UDPHost       : String = "127.0.0.1";
private var listenerPort  : int = 3333;
private var broadcastPort : int = 57131;
private var oscHandler    : Osc;

private var direction     : Vector3;
private var rotation      : int;
private var lookAt        : Vector3;
private var updatingFeet  : boolean;
private var updatingHead  : boolean;
public  var multiplier    : int = 10;

public var domeCam : GameObject;

public function Start ()
{	
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(UDPHost, broadcastPort, listenerPort);
	oscHandler = GetComponent("Osc");
	oscHandler.init(udp);
			
	oscHandler.SetAddressHandler("/move", updateFeet);
	oscHandler.SetAddressHandler("/look", updateHead);
	oscHandler.SetAddressHandler("/mindwave", updateBrain);
}

function Update () {	
	if (updatingFeet) {
		PassOnMovement(direction, rotation);
		updatingFeet = false;
	}
	if (updatingHead) {
		PassOnHeadOrientation(lookAt);
		updatingHead = false;
	}
}	

public function updateFeet (oscMessage : OscMessage) : void
{	
	//Debug.Log("ROTATION: " + oscMessage.Values[0] + ", VERTICAL: " + oscMessage.Values[1]);
	rotation = oscMessage.Values[0];// / (multiplier);
	var vertical:int = oscMessage.Values[1] * multiplier;
	direction = new Vector3(0, 0, vertical);
	updatingFeet = updatingHead = true;
} 

private function PassOnMovement (dir:Vector3, rot:int) : void 
{
	gameObject.SendMessage("UpdatePlayerPosition", dir);
	gameObject.SendMessage("AdjustPlayerRotation", rot);
}

public function updateHead (oscMessage : OscMessage) : void
{	
	Debug.Log("Y: " + oscMessage.Values[0] + ", Z: " + oscMessage.Values[1] + ", X: " + oscMessage.Values[2]);
	var z:float = -oscMessage.Values[1];
	var y:float = oscMessage.Values[0];
	var x:float = -(oscMessage.Values[2]);
	lookAt = new Vector3(x,y,z);
	updatingHead = true;
} 

private function PassOnHeadOrientation (dir:Vector3) : void 
{
	gameObject.SendMessage("AdjustSight", lookAt);
}

private function updateBrain (oscMessage : OscMessage) : void {
	Debug.Log("Mindwave readings: " + oscMessage.Values[0]);
	domeCam.noiseEffect.grainIntensityMax = oscMessage.Values[0];
	domeCam.noiseEffect.scratchIntensityMax = oscMessage.Values[0];
}

