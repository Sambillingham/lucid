using UnityEngine;
using System.Collections;

public class PresentationController : MonoBehaviour {

	int pIndex;
	GameObject video;

	// Use this for initialization
	void Start () {
		video = GameObject.Find("VideoPlane");
		pIndex = 1;
		ApplyTexture();
		Debug.Log("Presentation GO!");
		Screen.showCursor = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyUp("left")) {
			if (pIndex > 1) pIndex--;
			ApplyTexture();
		}
		if (Input.GetKeyUp("right")) {
			if (pIndex < 8) { 
				pIndex++;
				ApplyTexture();
			}
			if (pIndex == 8) {
				iTween.MoveTo(gameObject,iTween.Hash("z",+20,"time",100));
				video.SendMessage("Go");
				Debug.Log("Demo video GO!");
			}
		}
		if (Input.GetKeyUp("p")) {
			Application.LoadLevel("Lobby");
		}
	}

	private void ApplyTexture() {
		Texture text = Resources.Load("p"+pIndex) as Texture;
		renderer.material.mainTexture = text;
	}

}
