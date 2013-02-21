using UnityEngine;
using System.Collections;

public class DemoVideo : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

	}

	public void Go() {
		MovieTexture tex = renderer.material.mainTexture as MovieTexture;
		tex.Play();
		audio.Play();
		Debug.Log("Playing.." + tex.isPlaying);
	}

}
