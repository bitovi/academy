var comparify = require('../');

describe('Comparify', function() {

  var object = {
    key1: 1,
    key2: "2",
    keyNull: null,
    deep: {
      key3: 3
    },
    veryDeep: {
      value: {
        key4: 4
      }
    },
    many: [1, '2']
  };

  it('should check simple keys', function() {
    comparify(object, {key1: 1}).should.be.true;
    comparify(object, {key1: 0}, true).should.be.false;
    comparify(object, {keyNull: null}).should.be.true;
    comparify(object, {keyNull: 1}).should.be.false;
  });

  it('should check dot-notation keys', function() {
    comparify(object, {'deep.key3': 3}).should.be.true;
    comparify(object, {'deep.key3': 4}).should.be.false;
  });

  it('should check multiple keys', function() {
    comparify(object, {
      'key1': 1,
      key2: '2'
    }).should.be.true;

    comparify(object, {
      'key1': 1,
      key2: '3'
    }).should.be.false;
  });

  it('should check mixed simple and nested keys', function() {
    comparify(object, {
      'deep.key3': 3,
      key1: 1
    }).should.be.true;

    comparify(object, {
      'deep.key3': 2,
      key1: 1
    }).should.be.false;
  });

  it('should recurse through object searches', function() {
    comparify(object, {
      deep: {key3: 3}
    }).should.be.true;

    comparify(object, {
      deep: {key3: 4}
    }).should.be.false;
  });

  it('should handle mixed object and dot-notation', function() {
    comparify(object, {
      'deep.key3': 3,
      deep: {key3: 3}
    }).should.be.true;

    comparify(object, {
      'deep.key3': 4,
      deep: {key3: 3}
    }).should.be.false;

    comparify(object, {
      'deep.key3': 3,
      deep: {key3: 4}
    }).should.be.false;
  });

  it('should handle the kitchen sink', function() {
    comparify(object, {
      key1: 1,
      'key2': '2',
      keyNull: null,
      deep: {key3: 3},
      'deep.key3': 3,
      veryDeep: {
        'value.key4': 4,
        value: {key4: 4}
      },
      'veryDeep.value.key4': 4
    }).should.be.true;
  });

  it('should use regexes', function() {
    comparify(object, {'key2': /2/}).should.be.true;
    comparify(object, {'key2': /3/}).should.be.false;
  });

  it('should handle arrays as values', function() {
    comparify(object, {'many': 1}).should.be.true;
    comparify(object, {'many': '2'}).should.be.true;
    comparify(object, {'many': 3}).should.be.false;
  });

  it('should handle arrays as criterias', function() {
    comparify(object, {many: [1, '2']}).should.be.true;
    comparify(object, {many: ['1', 2]}).should.be.false;
  });

  describe('Example use test cases', function() {

    var email = {
      from: 'tester@example.com',
      to: ['myfriend@example.com', 'boss@example.com'],
      subject: 'My Email',
      body: 'Hello,\nI will be on vacation for the rest of the year.\n\nThanks!'
    };

    it('should check FROM address', function() {
      comparify(email, {from: 'tester@example.com'}).should.be.true;
      comparify(email, {from: 'other@example.com'}).should.be.false;
    });

    it('should check TO addresses', function() {
      comparify(email, {to: 'myfriend@example.com'}).should.be.true;
      comparify(email, {to: 'boss@example.com'}).should.be.true;
      comparify(email, {to: 'other@example.com'}).should.be.false;
    });

    it('should check multiple TO addresses', function() {
      comparify(email, {to: ['myfriend@example.com', 'boss@example.com']}).should.be.true;
      comparify(email, {to: ['myfriend@example.com', 'you@example.com']}).should.be.false;
    });
  });

  describe('README.md demo examples', function() {
    var data = {
      timestamp: 1395877795067,
      deviceID: '765CBA',
      recipient: {
        name: 'Thomas'
      },
      uses: ['making pancakes', 'running', 'hugs']
    };

    it('shouldn\'t lie', function() {
      (comparify(data, {deviceID: '765CBA'}) === true).should.be.true;
      (comparify(data, {deviceID: 'ABC123'}) === false).should.be.true;

      (comparify(data, {'recipient.name': 'Thomas'}) === true).should.be.true;
      (comparify(data, {recipient: {name: 'Thomas'}}) === true).should.be.true;

      (comparify(data, {uses: 'running'}) === true).should.be.true;
      (comparify(data, {uses: 'skiing'}) === false).should.be.true;

      (comparify(data, {uses: ['running', 'hugs']}) === true).should.be.true;
      (comparify(data, {uses: ['running', 'skiing']}) === false).should.be.true;

      (comparify(data, {'recipient.name': /omas/}) === true).should.be.true;
    });
  });

});
