using UnityEngine;
using System.Collections;

public class TheatreActivatable : MonoBehaviour {

	public string identifier;
	public string groupID;
	public float minDistance = 4.0f;
	public bool activated;
	public GameObject controller;
	private Transform playerRef;
	

	// Use this for initialization
	void Start () {
		playerRef = GameObject.Find("Player").transform;
	}
	
	// Update is called once per frame
	void Update () {
		if (!activated) {
			float dist = Vector3.Distance(transform.position, playerRef.position);

			if (dist <= minDistance) {
				if (controller) {
					Hashtable mess = new Hashtable();
					
					mess.Add("ID",identifier);
					mess.Add("Group",groupID);
					
					controller.SendMessage("Activated", mess);
					activated = true;
				}
			}
		}
	}

	public void Deactivate() {
		activated = false;
	}

}
	
