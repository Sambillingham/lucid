using UnityEngine;
using System.Collections;

public class Activatable : MonoBehaviour {

	public string identifier;
	public float minDistance = 10.0f;
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
			Debug.DrawLine(transform.position, playerRef.position, Color.red);
			// Debug.Log("Distance to " + identifier + ": " + dist);
			// Add a delay after which an item gets fully activated
			// or remove locking for re-activatability :3
			if (dist <= minDistance) {
				if (controller) {
					controller.SendMessage("Activated", identifier);
					activated = true;
					MonoBehaviour rm = gameObject.GetComponent("RotateMe") as MonoBehaviour;
					rm.enabled = true;
				}
			}
		}
	}
}
