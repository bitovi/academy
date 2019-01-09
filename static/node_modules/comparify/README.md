#Comparify

Simple criteria checking, so you can test a subset of an object's properties.

```
var comparify = require('comparify');

var data = {
  timestamp: 1395877795067,
  deviceID: '765CBA',
  recipient: {
    name: 'Thomas'
  },
  uses: ['making pancakes', 'running', 'hugs']
};

comparify(data, {deviceID: '765CBA'}) === true;
comparify(data, {deviceID: 'ABC123'}) === false;

// Comparify also supports nested requirements
comparify(data, {'recipient.name': 'Thomas'}) === true;
comparify(data, {recipient: {name: 'Thomas'}}) === true;

// And you can look in arrays
comparify(data, {uses: 'running'}) === true;
comparify(data, {uses: 'skiing'}) === false;

// You can require that multiple values are present in an array
comparify(data, {uses: ['running', 'hugs']}) === true;
comparify(data, {uses: ['running', 'skiing']}) === false;

// And you can use a Regex for values
comparify(data, {'recipient.name': /omas/}) === true;


```

## To Do

- [x] Add support for arrays (any / all matching)
- [x] Add support for regex comparison
- [ ] Add support for more types of comparison
  - [ ] Greater than / less than
  - [ ] Range
