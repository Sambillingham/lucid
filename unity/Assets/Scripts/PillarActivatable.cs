using UnityEngine;
using System.Collections;

public class PillarActivatable : MonoBehaviour {

	public string identifier;
	public float minDistance = 10.0f;
	private bool activated;
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

			if (dist <= minDistance) {
				if (controller) {
					controller.SendMessage("Activated", identifier);
					activated = true;
				}
			}
		}
	}
}