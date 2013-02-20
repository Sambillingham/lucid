using UnityEngine;
using System.Collections;

public class TitleScreenBehaviour : MonoBehaviour {

	float direction;
	string myIP;
	GUIStyle myStyle;

	// Use this for initialization
	void Start () {
		direction = -0.01f;
		//transform.Translate(0,0,-1.2f, Space.World);
		myIP = Network.player.ipAddress;
		Debug.Log(myIP);
		myStyle = new GUIStyle();
		myStyle.normal.textColor = Color.grey;
	}
	
	void OnGUI() {
        GUI.Label(new Rect(Screen.width / 2 - 50, Screen.height - 100, 100, 20), myIP, myStyle);
    }

	// Update is called once per frame
	void Update () {
		if (Input.GetKeyUp("space"))
			InitGame();

		if (transform.position.z > -3.2f && transform.position.z < 0.6f)
			transform.Translate(0,0,direction, Space.World);
		else 
			direction *= -1f;
			transform.Translate(0,0,direction * 2, Space.World);
	}

	void InitGame () {
		Debug.Log("Good luck!");
		Application.LoadLevel("Lobby");
	}

}
