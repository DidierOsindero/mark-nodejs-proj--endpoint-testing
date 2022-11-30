import supertest from "supertest";
import app from "./server";
import { ADVENTURE_ADMIN, MYSTERIOUS_ROBED_FIGURE } from "./constants/characters";
import { CAVE_EXTERIOR } from "./constants/locations";

test.skip("GET / responds with a welcome message from our mysterious robed figure", async () => {
  const response = await supertest(app).get("/");

  expect(response.body).toStrictEqual({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text:
        "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

test.skip("GET /quest/accept has our mysterious robed figure give a couple of further choices", async () => {
  const response = await supertest(app).get("/quest/accept");

  // check the speaker and location are right
  expect(response.body).toMatchObject({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
    },
  });

  // check the robed figure is saying something
  expect(typeof response.body.speech.text).toBe("string");

  // check that there are at least two further options
  expect(Object.keys(response.body.options).length).toBeGreaterThanOrEqual(2);
});

test.skip("GET /quest/decline responds with an apocalyptic message", async () => {
  const response = await supertest(app).get("/quest/decline");

  // located in the apocalypse
  expect(response.body.location).toBe("Apocalypse");

  // aggro speaker
  expect(response.body.speech.speaker.name).toBe("Titan, Destroyer of Worlds");

  // some aggro message
  expect(response.body.speech.text).toMatch("FOOL");
  expect(response.body.speech.text).toMatch(/mistake/i);

  // only includes the option to restart
  expect(response.body.options).toStrictEqual({ restart: "/" });
});

test("GET /quest/start/easy responds with Bobby the Wise and a path to Mount Dracon", async () => {
  const response = await supertest(app).get("/quest/start/easy");

  // there is _some_ location
  expect(response.body.location).toBeDefined();

  // there is _some_ speaker
  expect(response.body.speech.speaker.name).toBeDefined();

  // speaker invites you to go to Mount Dracon
  expect(response.body.speech.text).toMatch(/Mount Dracon/);
  expect(response.body.speech.text).toMatch(/dragon/i);

  // includes option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/hard responds with a Bobby the Wise and a path to Mordor", async () => {
  const response = await supertest(app).get("/quest/start/hard");

  // there is _some_ location
  expect(response.body.location).toBeDefined();

  // there is _some_ speaker
  expect(response.body.speech.speaker.name).toBeDefined();

  // speaker invites you to go to Mordor
  expect(response.body.speech.text).toMatch(/Mordor/);
  expect(response.body.speech.text).toMatch(/orcs/i);

  // includes option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /quest/start/impossible responds with almost certain death!", async () => {
  const response = await supertest(app).get("/quest/start/impossible");

  // there is _some_ location
  expect(response.body.location).toBeDefined();

  // there is _some_ speaker
  expect(response.body.speech.speaker.name).toBeDefined();

  // fiery death
  expect(response.body.speech.text).toMatch(/fireball/i);
  expect(response.body.speech.text).toMatch(/dragon/i);
  expect(response.body.speech.text).toMatch(/excruciating/i);

  // includes option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /help responds a description of the game", async () => {
  const response = await supertest(app).get("/help");

  // there is _some_location
  expect(response.body.location).toBeDefined();

  // there is _some_speaker
  expect(response.body.speech.speaker).toBeDefined();

  // check speaker is the ADVENTURE_ADMIN character
  expect(response.body.speech.speaker).toMatchObject(ADVENTURE_ADMIN)

  // there is some speech text with a few key words in it
  expect(response.body.speech.text).toMatch(/endpoint/i);
  expect(response.body.speech.text).toMatch(/adventure/i);

    // includes option to go to start
    expect(response.body.options).toMatchObject({ backToStart: "/" });
})
