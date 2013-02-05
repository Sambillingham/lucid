using UnityEngine;
using System.Collections;

public class TitleScreenBehaviour : MonoBehaviour {

	float localY;
	float direction;

	// Use this for initialization
	void Start () {
		localY = transform.position.y;
		direction = -0.01f;
		transform.Translate(0,-1.2f,0, Space.Self);
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyUp("space"))
			InitGame();

		if (transform.position.y > -0.6f && transform.position.y < 1f)
			transform.Translate(0,direction,0, Space.Self);
		else 
			direction *= -1f;
			transform.Translate(0,direction * 2,0, Space.Self);
	}

	void InitGame () {
		Debug.Log("Good luck!");
		Application.LoadLevel("Lobby");
	}

}
