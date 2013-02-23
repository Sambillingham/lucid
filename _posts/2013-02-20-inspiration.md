---
title: "The Challenge"
layout: post
author: "Flo"

---

Prior to its current development the second half of our experiment, *the challenge*, underwent many heartbreaking iterations. The revision closest to the final concept was essentially the sum of our individual pursuits:

- *"I want to explore the achievability of making pseudo-generative environments within Unity using our data as parameters and giving people the ability to explore (see [Bad Trip](http://www.polygon.com/2012/10/29/3571480/bad-trip) and the lovingly-crafted indie first-person-island-synthesizer [Proteus](http://www.visitproteus.com))."*

- *"I want to create something with a [collaborative element](http://gamasutra.com/view/news/172002/Molyneux_unveils_Curiosity_a_social_experiment_with_77K_inapp_purchase.php#.USd23aWDShg), a game-like experience that features an array of puzzles whereby the hints cannot be found within the experience itself and would get people to share their insights with each other."*

- *"I want to make an iOS app that works and looks gorgeous! Preferably it would also make use of a sophisticated algorithm and does more than we want the users to believe it does."*

- *"I want to do something crazy in the dome, using [biofeedback sensing technology](http://vimeo.com/m/57979514)."*

## Building Dreamland

Designing a [Surrealist dream world](http://blog.iso50.com/30810/bryan-olson-aka-glass-planet/) is pretty much the ballpit equivalent for every game environment modeller. You will literally not run out of ideas and you might spend hours building an area where [everything is made of candy floss](http://www.homecrux.com/2013/02/08/3761/padded-cell-is-fairytale-home-made-of-pink-candy-floss.html) but it doesn't fit in with any other aspect of the environment stylistically. A common theme was needed other than just dreams, like the *Land of Cockaigne* or maybe a [theme park setting](http://www.gamasutra.com/view/feature/3186/environmental_storytelling_.php).

From back when we were still exploring the possibilities of having the player relive a deterministic sequence of common  dreams we introduced the concept of the *hotel lobby*, a central hub that leads to a corridor of numbered dream rooms. Breaking up the game world into rooms would not only ease the development dramatically, but would also inform a lot of design choices as we were now dealing with something more concrete, man-made and of course interior.

After we settled on making a single-player experience with the focus on the dome environment it dawned upon us that the only way our game should be experienced was once. With that finiteness came the whole idea of the recruitment process, which would then dictate the world's parcour-like layout and would give us more ways of fleshing out the space with more meaningful geometry (like hinting at areas out of your reach to make it feel less linear).

For the adventurous of you, here is a curated set of [sketches depicting various environments](https://dl.dropbox.com/u/998319/DAT/Lucid_design_document.pdf).

## Developing a Visual Style

For visuals we mostly inspired each other during the process. Initially when I told Ben to make me some textures with *"dystopian [art déco grandeur](http://www.creativereview.co.uk/cr-blog/2013/february/poster-art-150) and a dash of [communist propaganda](http://www.examiner.com/images/blog/wysiwyg/image/communist-party-poster.jpg)"* he produced what from then on was known as the Lucid logo. Ben's simple geometric style, in combination with several examples of [minimalist architecture](http://www.behance.net/gallery/THE-MINIMALIST/5708129) then influenced the design of the lobby and so on and so forth.

![Moodboard](img/moodboard.jpg)

Only Luke and I were brave enough to build in three dimensions and since he had not touched a 3D package in years we decided to go for plain minimal geometry and only use textures where necessary to create a more homogenous picture. In addition we tried giving each room a unique feel by trying out different lighting setups. 

The models turned out fine, yet it would take a little more effort to make everything look good in the dome environment. For starters, the dome camera rig (or perhaps my graphics card) did not allow for soft real-time shadows so they had all to be calculated and baked into the environments in advance using *Unity*'s *BEAST* lightmapper. Also making the switch from *blender* to *Cinema4D* mid-development to be able to incorporate Luke's *3Ds Max* models better may not have been the best idea in terms of productivity. 

![Cello model](img/cello.jpg)

## Experiment + game + play

As mentioned earlier, we settled on three puzzle rooms, each testing for different stimulae the player would have received before playing the game: a simple choice out of three options, a reconstruction of a story through objects depicting events or turning points and a re-creation of a musical track with the help of the given instruments. 

Originally we wanted the iPhone responsible for moving the player around inside a little ball to make it feel more natural, so we didn't consider using the phones screen as an input mechanism until late. This meant we came up with ways of interacting with the environment without buttons instead. Easier said than done, yet with a little inspiration from [kairo](http://kairo.lockeddoorpuzzle.com), it certainly didn't seem all that impossible. For the first two challenges the player would simple go down a corridor and approach an object to activate it, only for the musical challenge we added some pressure pads on the floor to make it less fiddly. Well it wasn't ideal, but playable and I would also like to apologise for my inconsistent performance during the recording of those sound clips :>

For the unlikely event of the participant getting all the answers right, he/she would receive a keycard that would allow him/her to explore other parts of the starting area. We didn't feel the need to punish the player for getting things wrong, however we made sure that there would be enough audible feedback to not lose the player along the way.

We felt that there had been scope for more rooms, but in regards to presentation time and player satisfaction we stopped at three. In the end I was glad that Luke offered to help out with the game logic - despite no prior knowledge of C# - as the creation and the sorting out of assets could have easily been a one-man job on its own. I can finally understand how there are people across several industries who "just" do lighting..

## Let the polygons speak for themselves

![Lobby](img/screen1.png)
![Crossroads](img/screen2.png)
![Choice Room](img/screen3.png)
![Story Room](img/screen4.png)
![Theatre Room](img/screen5.png)

**Technologies used and abused during the creation of this project**

git, Photoshop, Unity, Sublime Text, blender, Cinema4D, 3Ds Max, XCode, Phonegap, NodeJS, AfterEffects,  GarageBand, jekyll, Paper (iOS) and last but not least, the internet.