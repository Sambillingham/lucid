using UnityEngine;
using System.Collections;

public class EnterRoom : MonoBehaviour {

	private Color aC;

	// Use this for initialization
	void Start () {
		aC = RenderSettings.ambientLight;
		RenderSettings.ambientLight = Color.black;
	}
	
	// Update is called once per frame
	void Update () {
		Color cC = RenderSettings.ambientLight;
		if (cC != aC)
			RenderSettings.ambientLight = Color.Lerp(cC, aC, 0.1f);
	}
}
