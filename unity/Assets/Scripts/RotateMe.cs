using UnityEngine;
using System.Collections;

public class RotateMe : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0,10 * Time.deltaTime,0, Space.World);
	}
}
