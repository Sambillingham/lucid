using UnityEngine;
using System.Collections;

public class TheatreController : MonoBehaviour 
{
	public Hashtable choices;
	private GameObject player;

	void Start() {
		choices = new Hashtable();
		choices.Add("bass", "");
		choices.Add("drums", "");
		choices.Add("guitar", "");
		choices.Add("organ", "");
		player = GameObject.Find("Player");
	}

	public void Activated (Hashtable h) 
	{
		string id = h["Group"] as string + "_" + h["ID"] as string;
		//Debug.Log(id);
		DisableAll(h["Group"] as string);
		GameObject go = GameObject.Find(id);
		go.audio.mute = false;
		choices[h["Group"]] = h["ID"];
		ValidateChoices();
	}
	
	private void DisableAll(string tag){
		GameObject[] gos;
		
		gos = GameObject.FindGameObjectsWithTag(tag);
		
		foreach(GameObject go in gos)
		{
			go.SendMessage("Deactivate");
			go.audio.mute = true;
		}
	
	}

	private void ValidateChoices() {
		string c = choices["bass"] as string + choices["drums"] as string + choices["guitar"] as string + choices["organ"] as string; 
		if (c == "cbbb") {
			Debug.Log("Winner!");
			player.SendMessage("ClearChallenge", 3);
		}
		else {
			// Debug.Log("Nope!");
		}
	}

	private void LogChoices() {
		Debug.Log("===============================");
		Debug.Log("Bass: " + choices["bass"]);
		Debug.Log("Drums: " + choices["drums"]);
		Debug.Log("Guitar: " + choices["guitar"]);
		Debug.Log("Organ: " + choices["organ"]);
	}
	
}
