using UnityEngine;
using System.Collections;

public class TitleScreenBehaviour : MonoBehaviour {

	float direction;

	// Use this for initialization
	void Start () {
		direction = -0.01f;
		//transform.Translate(0,0,-1.2f, Space.World);
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
