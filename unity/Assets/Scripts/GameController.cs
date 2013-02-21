using UnityEngine;
using System.Collections;

public class GameController : MonoBehaviour {

	public int[] challenges;
	public AudioSource success;
	public AudioSource failure;
	private GameObject keyCard;
	public bool cardHolder;
	public bool winner;

	// Use this for initialization
	void Start () {
		challenges = new int[3] {0,0,0};
		keyCard = GameObject.Find("Keycard");
		Screen.showCursor = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (winner && !cardHolder) {
			float dist = Vector3.Distance(gameObject.transform.position, keyCard.transform.position);
			Debug.DrawLine(gameObject.transform.position, keyCard.transform.position, Color.red);
			if (dist < 5.0f) {
				Destroy(keyCard);
				cardHolder = true;
				GameObject[] readers = GameObject.FindGameObjectsWithTag("unlockable");
				foreach (GameObject r in readers) {
					r.SendMessage("MakeOpenable");
				}
			}
		}
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
			winner = true;
			GameObject deckel = GameObject.Find("KeycardCover");
			iTween.MoveTo(deckel,iTween.Hash("y",+20,"time",200));
		}
	}

}
