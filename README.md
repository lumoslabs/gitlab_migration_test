# Lumos Google Assistant App

## Development

### Getting started

#### Choose node version

```bash
nvm use
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

#### Start

```bash
yarn dev
```

Open [http://localhost:7300](http://localhost:7300) with your browser to see the result.

### Testing on simulator

You should use ngrok for test local version on [simulator](https://console.actions.google.com/u/3/project/lumos-nest-prod/simulator) and set public url to *.env.local* as a *PUBLIC_URL*

### Folder structure

* Frontend routes - */src/pages*
* React components - */src/components* can be imported by alias @components/*
* UI components - */src/components/ui* can be imported by alias @components/ui/*
* Backend routes - */src/pages/api/*
* Backend modules - */src/api/*

[aliases](https://nextjs.org/docs/advanced-features/module-path-aliases) 

### Linting

```bash
yarn lint
```

### Testing

TODO

 