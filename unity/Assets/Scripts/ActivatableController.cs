using UnityEngine;
using System.Collections;

public class ActivatableController : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void Activated (string id) {
		Debug.Log(id + " has been activated.");
		// Do some stuff depending on the string passed as parameter
	}
}
