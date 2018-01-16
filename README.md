# node-destiny-2 [![Build Status](https://travis-ci.org/brandonmanke/node-destiny-2.svg?branch=master)](https://travis-ci.org/brandonmanke/node-destiny-2) [![npm version](https://badge.fury.io/js/node-destiny-2.svg)](https://badge.fury.io/js/node-destiny-2) [![codecov](https://codecov.io/gh/brandonmanke/node-destiny-2/branch/master/graph/badge.svg)](https://codecov.io/gh/brandonmanke/node-destiny-2)

> :new_moon: A zero dependency Destiny 2 API Wrapper written in Node.js 

#### Note

This project is still in early stages of development. The Destiny 2 API is also still being worked on, so some of the endpoints may not work correctly.

## Getting Started

Super simple to set up.

```JavaScript
// Getting API Manifest Example
const Destiny2API = require('node-destiny-2');

const destiny = new Destiny2API({
  key: 'your-api-key'
});

destiny.getManifest()
  .then(res => console.log(`Manifest: ${res.Response}`))
  .catch(err => console.log(`Error: ${err}`));
```

### Installation

Install from NPM with: 

`npm install node-destiny-2`


### Examples

TODO

### Documentation

For further reading on the API documentation see the [Official Destiny 2 API Documentation](https://github.com/Bungie-net/api).

TODO

## Contributing

If you see a feature that may need to be added, feel free to send a pull request. Feel free to fix an issue or file an issue of your own. I will set up a `CONTRIBUTING.md` eventually for code style and a little more information on creating pull requests. 

## License

The code in this repository is licensed under the [MIT License](LICENSE). Unless otherwise specified by 3rd party software.