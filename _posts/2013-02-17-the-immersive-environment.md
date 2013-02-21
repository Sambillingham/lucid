---
title: "The Immersive Environment"
layout: post
author: "Sam"
---

*"Participants within our experiment are invited to take part in the 'testing' phase whenever they feel ready to do so."*

The ability to implant thoughts into a participants mind is the main focus for our experiment. With the scepticism behind Hypnopaedia we decided to help our participants along by making the environment for recall as immersive as possible, with the hope than recall would be improved. The testing phase will be conducted within the immersive vision theatre at Plymouth University, which is home to a hemispherical dome, tilted audience seating and an atmospheric environment. We hope that the increased peripheral vision and enhanced audio visual experience will help participants to recall the information from their sleeping state for use within our experimental arena. 

## Enhancing the Interface

Each participant will need 3 tools to fully interact with our experiments, 2 iPhones and a NeuroSky MindWave (All are provided). While the phones are used to allow a user to control their experience the MindWave device is intentionally added to help a user become more aware of specific states they're currently in.

We employ functionality with the NeuroSky Mindwave to control a to blurring effect within the experiment, this blur effect is in direct correlation to a participants relaxation state and diminishes as the subject becomes more relaxed. We choose this simple blur effect to act as a feedback loop for the subject allowing them to constantly asses how relaxed they are.

## Player Controls

Early on in this project we transitioned from a co-op experience to a single player one, this left us with a detached controller  model aimed at two players working together to achieve movement and view. Instead of throwing our controls into a gamepad, we decided to keep our controls split and allow the player to use both at the same time. Both Movement and Look are based around using an iPhone's gyroscope and accelerometer. 

Movement is via holding the phone as it acts like a controller, Tilting forward and backward moves a subject in the respective direction and tiling left and right rotates the subject to allow multi directional movement.

The ability to look around is slightly different and involves an iPhone attached to the MindWave sensor situated on a subjects head. The act of attaching an iPhone to a subject head may seem ominous or unnecessary, however it adds an interesting element of natural control. The iPhone controls where the character within Unity is currently looking, there is such an extreme field of view within the IVT that this becomes a subtle movement. While naturally looking at different aspects in the environment the centre position slightly changes in reaction to the subject moving their head.

## Cogs in the machine

To achieve the interaction between the mobile accelerometer for our controller and the experiment created within Unity 3D we used a number of real-time web technologies. Using Node.js, Socket.io and Node-OSC we were able to create seamless interaction and enhance our project with interaction devices of our choosing. All of the code behind our project is publicly available in our Github repo, [here](https://github.com/Sambillingham/lucid).
 




