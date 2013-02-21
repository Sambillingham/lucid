using UnityEngine;
using System.Collections;

public class PillarRoomController : MonoBehaviour 
{
	public string guess;
	public int count;
	private bool pillarFlag; 
	private GameObject player;
	
	// Use this for initialization
	void Start () 
	{
		player = GameObject.Find("Player");
	}

	public void Activated (string id) 
	{
		if (!pillarFlag) 
		{
		
			GameObject RightPillar = GameObject.Find("RightPillar");
			GameObject CentrePillar = GameObject.Find ("CentrePillar");
			GameObject LeftPillar = GameObject.Find ("LeftPillar");
			
			Debug.Log(id + " has been activated.");
			
			if(id == "5")
			{
				iTween.MoveTo(RightPillar,iTween.Hash("y",-20,"time",200));
				guess = "triangle";
				count = 1;
				pillarFlag = true;
				audio.Play();
				
			}
			if(id == "6")
			{
				iTween.MoveTo(CentrePillar,iTween.Hash("y",-20,"time",200));
				guess = "square";
				count = 1;
				pillarFlag = true;
				audio.Play();
			}
			
			if(id == "7")
			{
				iTween.MoveTo(LeftPillar,iTween.Hash("y",-20,"time",200));
				guess = "circle";
				count = 1;
				pillarFlag = true;
				audio.Play();
			}
		
	
		}
	
		if(count == 1)
		{
			if(guess=="triangle")
			{
				Debug.Log("Correct!");
				player.SendMessage("ClearChallenge", 1);

			}
			else
			{
				Debug.Log("You suck!");
				player.SendMessage("FailChallenge", 1);
			}
		}
	}
	

	
	
}
