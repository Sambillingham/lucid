using UnityEngine;
using System.Collections;

public class TitleScreenBehaviour : MonoBehaviour {

	public int   attemptNo;
	public int   currentRoom;
	public int[] roomSequence;

	// Use this for initialization
	void Start () {
		attemptNo = PlayerPrefs.GetInt("Runs");
		roomSequence = new int[9] {1,2,3,4,5,6,7,8,9};
		Debug.Log("Welcome back, Traveller.");
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI () {
		if(GUI.Button(new Rect((Screen.width / 2) - 50, Screen.height - 70,100,20), "Enter Dream")) {
			attemptNo++;
			PlayerPrefs.SetInt("Runs", attemptNo);
			Debug.Log("This is attempt #" + attemptNo);
			GoToNextLevel(roomSequence[0]);
		}
	}

	void GoToNextLevel (int id) {
		Debug.Log("Loading level: " + id);
		currentRoom++;
		// store currentRoom and roomSequence somewhere?
		Application.LoadLevel(currentRoom);
	}

	int GetNextLevelID () {
		return roomSequence[currentRoom + 1];
	}

}
