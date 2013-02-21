using UnityEngine;
using System.Collections;

public class StoryRoomController : MonoBehaviour 
{
	public string guess;
	public int count;
	private GameObject player;
	
	// Use this for initialization
	void Start () {
		player = GameObject.Find("Player");
	}

	public void Activated (string id) 
	{

		
		Debug.Log(id + " has been activated.");
		
		GameObject shoeLight = GameObject.Find("ShoeLight");
		
		GameObject bagelLight = GameObject.Find("BagelLight");
		
		GameObject submarineLight = GameObject.Find("SubmarineLight");
		
		GameObject hatLight = GameObject.Find("HatLight");
		
		if(id == "1")
		{
			bagelLight.light.intensity = 50;
			
			guess = guess + "bagel";
			count = count + 1;
			
			Debug.Log("Guess =" + guess + "Count =" + count);

		}
		
		if(id == "2")
		{
			shoeLight.light.intensity = 50;
			
			guess = guess + "shoe";
			count = count + 1;
			
			Debug.Log("Guess =" + guess + "Count =" + count);
		}
		
		if(id == "3")
			
		{
			
			submarineLight.light.intensity = 50;
			
			guess = guess + "submarine";
			count = count + 1;
			
			Debug.Log("Guess =" + guess + "Count =" + count);

		
		}
		
		if(id == "4")
		{
			hatLight.light.intensity = 50;
			
			guess = guess + "hat";
			count = count + 1;
			
			Debug.Log("Guess =" + guess + "Count =" + count);
			
		
		}
		
		if(count == 4)
		{
			if (guess == "bagelshoesubmarinehat")
			{
				Debug.Log("You win!");
				player.SendMessage("ClearChallenge", 2);

			}
			else 
			{
				Debug.Log ("You suck.");	
				player.SendMessage("FailChallenge", 2);
			}
		}
			
		
	}
		
	
}
