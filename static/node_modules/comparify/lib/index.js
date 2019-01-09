var util = require('./util');
var assert = require("assert");

var comparify = module.exports = function(object, criteria) {
  var crit, value;

  for (var key in criteria) {
    if (criteria.hasOwnProperty(key)) {

      // Check for values
      crit = util.getKey(criteria, key);
      value = util.getKey(object, key);

      if ({}.toString.call(crit) === '[object RegExp]') {
        // We're using a regex for criteria
        if (!crit.test(value)) return false;

      } else if (util.isObject(crit)) {
        // Criteria is an object, recurse
        if (!comparify(value, crit)) return false;

      } else if (Array.isArray(crit) && Array.isArray(value)) {
        // Make sure each of the criterias are in the value array
        for (var i=crit.length-1; i>=0; i--) {
          if (value.indexOf(crit[i]) < 0) return false;
        }

      } else if (Array.isArray(crit)) {
        // Only criteria is an array, this isn't supported
        return false;

      } else if (Array.isArray(value)) {
        // Look for a single criteria in the values array
        if (value.indexOf(crit) < 0) return false;

      } else {
        // Simple key lookup
        if (value !== crit) return false;
      }
    }
  }
  
  return true;
};