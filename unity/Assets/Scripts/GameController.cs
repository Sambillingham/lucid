using UnityEngine;
using System.Collections;

public class GameController : MonoBehaviour {

	public int[] challenges;
	public AudioSource success;
	public AudioSource failure;

	// Use this for initialization
	void Start () {
		challenges = new int[3] {0,0,0};
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void ClearChallenge (int index) {
		challenges[index-1] = 1;
		success.Play();
		CheckProgress();
	}

	public void FailChallenge (int index) {
		challenges[index-1] = -1;
		failure.Play();
		CheckProgress();
	}

	private void LogChallenges() {
		Debug.Log("Choice: " + challenges[0] + ", Story: " + challenges[1] + ", Theatre: " + challenges[2]);
	}

	private void CheckProgress() {
		LogChallenges();
		if (challenges[0] == 1 && challenges[1] == 1 && challenges[2] == 1) {
			Debug.Log("YOU BEAT THE GAME!");
			GameObject deckel = GameObject.Find("KeycardCover");
			iTween.MoveTo(deckel,iTween.Hash("y",+20,"time",200));
		}
	}

}
