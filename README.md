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

You can setup local dynamodb instanse with dynalite or 

##### Dynalite

Just a local implementation of Amazon's DynamoDB built on LevelDB

```bash
yarn run dynalite
```

OR

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

 