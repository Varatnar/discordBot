## Basic information about this bot

### Getting the dependencies

1. You will first need an installation of node.js, follow this[link](https://nodejs.org/en/) to their official site.

    - Version 8 was used.
1. Once node.js is installed, while being at the root of the project run :
```bash
$ npm install
```
### Config file

You might have noticed that the bot comes with a `config.json.dummy` file. You will have to rename this file to `config.json` and make sure to fill in your bot token.

### Building the js code

- You will have to run the following command to transpile the code :
```bash
$ npm run build
```

- You can also have the build be trigger every time the source code is modified; To watch the code run the following command :
```bash
$ npm run watch
```

### Running the bot

1. Make sure you have already built the project and run the following command :
```bash
$ npm run start
```
* After a few seconds you should see a `I am ready!` text appear.