
private var UDPHost       : String = "127.0.0.1";
private var listenerPort  : int = 3333;
private var broadcastPort : int = 57131;
private var oscHandler    : Osc;

private var direction     : Vector3;
private var rotation      : int;
private var updatingFeet  : boolean;
private var updatingHead  : boolean;
public  var multiplier    : int = 10;

public function Start ()
{	
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(UDPHost, broadcastPort, listenerPort);
	oscHandler = GetComponent("Osc");
	oscHandler.init(udp);
			
	oscHandler.SetAddressHandler("/move", updateFeet);
	oscHandler.SetAddressHandler("/look", updateHead);
}

function Update () {	
	if (updatingFeet) {
		PassOnDirection(direction, rotation);
		updatingFeet = false;
	}
	if (updatingHead) {
		PassOnHeadRotation(direction);
		updatingHead = false;
	}
}	

public function updateFeet (oscMessage : OscMessage) : void
{	
	Debug.Log("HORIZONTAL: " + oscMessage.Values[0] + ", VERTICAL: " + oscMessage.Values[1]);
	//var horizontal:int = oscMessage.Values[0];
	rotation = oscMessage.Values[0];
	var vertical:int   = oscMessage.Values[1] * -multiplier;
	direction = new Vector3(0, 0, vertical);
	updatingFeet = true;
} 

private function PassOnDirection (dir:Vector3, rot:int) : void 
{
	gameObject.SendMessage("UpdatePlayerPosition", dir);
	gameObject.SendMessage("RotatePlayer", rot);
}

public function updateHead (oscMessage : OscMessage) : void
{	
	Debug.Log("HORIZONTAL: " + oscMessage.Values[0] + ", VERTICAL: " + oscMessage.Values[1]);
	var horizontal:int = oscMessage.Values[0];
	var vertical:int   = oscMessage.Values[1] * multiplier;
	direction = new Vector3(horizontal, 0, vertical);
	updatingHead = true;
} 

private function PassOnHeadRotation (dir:Vector3) : void 
{
	gameObject.SendMessage("UpdateHeadRotation", dir / multiplier);
}

