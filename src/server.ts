import express from "express";
import {
  ADVENTURE_ADMIN,
  MYSTERIOUS_ROBED_FIGURE,
} from "./constants/characters";
import { CAVE_EXTERIOR, HANDFORTH_PARISH_COUNCIL } from "./constants/locations";

const app = express();

app.get("/", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text: "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

app.get("/help", (req, res) => {
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: ADVENTURE_ADMIN,
      text: "This is the endpoint adventure! It's based on the classic 'choose your own adventure' books of ye olden 20th century times. When you visit an endpoint, you're presented with a scene and some text, and then you have a few options to choose from - your simulate turning to a new page by hitting a new endpoint.",
    },
    options: {
      backToStart: "/",
    },
  });
});

app.get("/quest/accept", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text: "Ah, yes, that is a wise decision. Now, tell me, what sort of questing experience do you have?",
    },
    options: {
      rookie: "/quest/start/easy",
      pro: "/quest/start/hard",
      "completed it, m8": "/quest/start/impossible",
    },
  });
});

app.get("/quest/decline", (req, res) => {
  res.json({
    location: "Apocalypse",
    speech: {
      speaker: {
        name: "Titan, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "You FOOL! You have made a mistake. Now you will suffer.",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/easy", (req, res) => {
  res.json({
    location: "Fairy Land",
    speech: {
      speaker: {
        name: "Bobby the Wise",
        description: "The wisest gheezer you'll ever meet",
      },
      text: "Alright mate? Take the path /quest/middle/easy to fight the dragon at Mount Dracon",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/middle/easy", (req, res) => {
  res.json({
    location: "Mount Dracon",
    speech: {
      speaker: {
        name: "Dragon of Dracon",
        description:
          "The friendliest dragon you'll ever have the honour of meeting!",
      },
      text: "Pleasure to meet you! I'm Dragon of Dracon. You didn't think this was a boss battle did you? I hate violence! Take the path /quest/end/easy to enter into the fires of Mount Dracon",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/end/easy", (req, res) => {
  res.json({
    location: "Fires of Mount Dracon",
    speech: {
      speaker: {
        name: "Madame Unicorn",
        description: "A silver unicorn of great elegance",
      },
      text: "Wow, you are a great quester! Well done for making it this far! Simply put this gold ring on and follow the path to /quest/complete to finish your quest!",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/complete/easy", (req, res) => {
  res.json({
    location: "Celestial City",
    speech: {
      speaker: {
        name: "Jacob",
        description: "The man himself",
      },
      text: "Congratulations, you have overcome many challenges and completed your quest. This is the end of the game!",
    },
    options: {
      "play again": "/",
    },
  });
});

app.get("/quest/start/hard", (req, res) => {
  res.json({
    location: "Fairy Land",
    speech: {
      speaker: {
        name: "Davide the Devious",
        description: "The most devious snake you'll ever meet",
      },
      text: "Ssssssalut....Take the path /quest/boss/hard to fight the orcs at Mordor",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/impossible", (req, res) => {
  res.json({
    location: "Fairy Land",
    speech: {
      speaker: {
        name: "DIDIER, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "Be prepared to meet your demise! I will strike you with a Dragon's fireball, causing you EXCRUCIATING pain!",
    },
    options: {
      restart: "/",
    },
  });
});

export default app;
