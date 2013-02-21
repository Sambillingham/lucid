using UnityEngine;
using System.Collections;

public class DoorController : MonoBehaviour {

	public GameObject door;
	private GameObject player;
	public bool openable;
	public bool open;

	// Use this for initialization
	void Start () {
		player = GameObject.Find("Player");
	}
	
	// Update is called once per frame
	void Update () {
		if (openable && !open) {
			float dist = Vector3.Distance(gameObject.transform.position, player.transform.position);
			Debug.DrawLine(gameObject.transform.position, player.transform.position, Color.red);

			if (dist < 5.0f) {
				OpenDoor();
			}
		}
	}

	public void MakeOpenable() {
		openable = true;
		Debug.Log("Doors can now be opened.");
	}

	public void OpenDoor () {
		iTween.MoveTo(door,iTween.Hash("y",+200,"time",200));
		open = true;
	}

}
