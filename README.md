# Lumos Google Assistant App

## Development

### Getting started

#### Choose node version from .nvmrc

```bash
nvm use v14.17.0
```

#### Install dependencies

```bash
yarn install
```

#### Update configuration file

All enviroment variables should be stored in *.env.example*, just copy paste it to *.env.local* file

```bash
cp  .env.example .env.local
```

#### Setup Dynamodb (only for development)

You can either setup a local dynamodb instance with dynalite:

##### Dynalite

Just a local implementation of Amazon's DynamoDB built on LevelDB

Authenticate with AWS:
```
eval $(aws-okta -d -t 10h env prod-g-analysts)`
```

```bash
yarn run dynalite
```

_OR_

##### Docker

Official version of local dynamodb

```bash
docker run -p 8001:8001 -p 8002:8002 -it --rm instructure/dynamo-local-admin
```

Dynamodb will be available on http://localhost:8002 and dynamo-admin on http://localhost:8001


#### Migrate and seed tables

```bash
yarn run migrate
```


#### Start

```bash
yarn dev
```

Open [http://localhost:7300](http://localhost:7300) with your browser to see the result.

### Testing on simulator

Set up NGROK: https://dashboard.ngrok.com/get-started/setup
open `~/.ngrok2/ngrok.yml` and add:

```
authtoken: <your auth token>
tunnels:
  lumos-google-assistant:
    proto: http
    addr: 7300
```

```
ngrok start lumos-google-assistant
```

- Put the ngrok https public url in *.env.local* as a *PUBLIC_URL*
- Go to Settings in https://console.actions.google.com/project/lumos-nest-prod/simulator and put this URL in the Test URL field:
 https://{yourngrokdomain}.ngrok.io/api/google/fulfillment


### Folder structure

* Frontend routes - */src/pages*
* React components - */src/components* can be imported by alias @components/*
* UI components - */src/components/ui* can be imported by alias @components/ui/*
* Styles - */src/styles/* can be imported by alias @styles/*
* Assets - */public/assets/* can be imported by alias @assets/*
* Add more shortcuts in tsconfig.json paths
* Backend routes - */src/pages/api/*
* Backend modules - */src/api/*
* Tools - */tools/*

[aliases](https://nextjs.org/docs/advanced-features/module-path-aliases) 

### Linting

```bash
yarn lint
```

### Testing

TODO


### Games integration

SPA communicate with games by global functions 
 * window.sendToJavascript(data: GameEventName | [GameEventName, GameEventData], argData: GameEventData | null) => void
 * window.sendEventToCocos(data: SpeechEvent) => void

#### window.sendEventToCocos - SpeechEvent

```
  interface SpeechEvent {
      hypothesisMatchSets?: Record<any,any>,
      phrases?: string[],
      isFinal?: boolean,
      action?: string
  }
```

CMM data events are passed through from Assistant. Parameters:
* hypothesisMatchSets (array of objects)
* phrases (array of strings): best guess matches of speech
* isFinal (boolean): Whether or not this is the last set of hypotheses in a single speech detection

Other actions are passed through as: action (string):
* cmm_end - Continuous match mode ended
* cmm_start - Continuous match mode started
* cmm_unmatched - Detected speech but did not match against the current CMM dictionary
* quit - Tell the game to quit (normal voice intent on pause menu)
* restart - Tell the game to restart (normal voice intent on pause menu)
* resume - Tell the game to resume (normal voice intent on pause menu)
* tts_start - Text-to-speech output started
* tts_end - Text-to-speech output finished
* tts_mark - Text-to-speech mark (other than start and end) encountered
    mark (string) - mark name
* tutorial - Tell the game to start the tutorial (normal voice intent on pause menu)

#### window.sendToJavascript - GameEventName
```
    type GameEventName = string;
    type GameEventData = any;
```

GameEventName -
* game:abort_update - This is used for data tracking incomplete gameplays on web. Should not be active and should be ignored.
* game:nest_cmm_pause - Request stop of continuous match mode. Currently used when pausing the game and switching to normal voice input.
* game:nest_cmm_restart - Request restart of continuous match mode. Currently used after resuming from pausing.
* game:nest_cmm_resume - Not used anymore. Redundant with cmm_restart.
* game:nest_cmm_start - Request start of continuous match mode
      expected_phrases (array of objects): List of words to match against to be sent to Continuous Match system (limit 1000)
      phrase (string) - word to match
      alternative_phrases (array of strings) - alternatives that should match and return the primary word
* game:complete - Game has finished and data payload is returned. Can remove game and move on to next screen.
* game:loadComplete - Game engine has finished loading - may show game
* game:pause - Game is paused (no special action to take, but should be ready to listen for game action intents)
* game:quit - Quit triggered - should clean up game and move to main menu
* game:resume - Game is resuming (no action to take)
* game:speech - Trigger text-to-speech. Parameters:
      text (string) - text to send through TTS
      prompt (boolean) - true if Assistant should open a voice prompt after TTS is completed
* game:start - Game has started

### Scenes and intents managments

//TODO: describe flow of scenes managment

[gactions cli tool](https://developers.google.com/assistant/actionssdk/gactions?hl=en&authuser=3)

### User Storage

[docs](https://developers.google.com/assistant/conversational/storage-user?hl=en&authuser=3%2F%3Fq%3Dconversion)

User params properties

#### id
uuid of user from dynamodb, stored in StartApp handler
```
{
  "id" : string
}
```

#### scores
Top scores of the user, where key is a game id and value is array with 5 last top gameplay info,

```
  {
    "scores": Record<string, {
      "score": number, // gamerun scores
      "date": string, // gamerun complete datetime
      "i": number // index number for gamerun, useful for fast sorting
    }[]>
  }
```

Example - 
```
{
  "color-match-nest": [
    {
      "i": 4,
      "score": 92,
      "date": "2021-07-26T13:43:44Z"
    },
    {
      "score": 92,
      "date": "2021-07-27T13:48:11Z",
      "i": 1
    },
    {
      "score": 82,
      "i": 2,
      "date": "2021-07-27T09:51:13Z"
    },
    {
      "date": "2021-07-26T14:33:03Z",
      "i": 6,
      "score": 56
    },
    {
      "score": 52,
      "i": 4,
      "date": "2021-07-27T14:33:05Z"
    }
  ],
}
```


#### training

Last workout information

```
  {
    "training": {
      "version": number, // current TrainingManager version, useful for invalidate all current user trainings
      "games": string[], // list of uncompleted games
      "size": number // total games count
      "deadline": number // unix timestamp, ttl system for training manager
    }
  }
```

Example -

```
{
  "training": {
    "version": 1,
    "games": [
      "train-of-thought-nest",
      "ebb-and-flow-nest",
      "color-match-nest"
    ],
    "size": 3,
    "deadline": 1627516800
  }
}
```


#### isLinked

boolean, is user already linked to rails account


#### tokenPayload

Payload of google auth token

Example -

```
  "tokenPayload": {
    "iss": "https://accounts.google.com",
    "nbf": 1627662520,
    "aud": "140360206587-q7naddm3fnd6qndt2m95v9fhp112vskq.apps.googleusercontent.com",
    "sub": "109181940190210131768",
    "hd": "lumoslabs.com",
    "email": "yura.borue@lumoslabs.com",
    "email_verified": true,
    "name": "Yuriy Borue",
    "picture": "https://lh3.googleusercontent.com/a/AATXAJzuL8BcrufWSjXfi4lKvgw0E1qldItmPwwU0c2r=s96-c",
    "given_name": "Yuriy",
    "family_name": "Borue",
    "iat": 1627662820,
    "exp": 1627666420,
    "jti": "31fc96f08cf3dd9ff81878342c3f469a691ed7d6"
  }
```


### Known issues 

#### User Storage is always empty
Just a allow "Web & App Activity" on the [Activity controls](https://myactivity.google.com/u/3/activitycontrols?pli=1) page

#### Clear User Storage

You can clear user storage on the [App page](https://assistant.google.com/u/3/services/a/uid/00000020ae1ec8fb?hl=en&e=-WebDirectoryEmbeddedWebviewExperiment&jsmode=o) , with *Stop Lumosity from remembering me (?)* button

#### isGuest always true

You can change it on app page https://assistant.google.com/u/3/services/a/uid/00000020ae1ec8fb?hl=en&e=-WebDirectoryEmbeddedWebviewExperiment&jsmode=o with Allow Lumosity to remember me (?) button
