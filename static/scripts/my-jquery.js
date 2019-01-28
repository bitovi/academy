(function() {
  window.$ = function(selector) {
    if ( !(this instanceof $) ) {
      return new $(selector);
    }
    var elements;
    if (typeof selector === "string") {
      elements = document.querySelectorAll(selector);
    } else if ($.isArrayLike(selector)) {
      elements = selector;
    }
    [].push.apply(this, elements);
  };

  $.extend = function(target, object) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        target[prop] = object[prop];
      }
    }
    return target;
  };

  // Static methods
  $.extend($, {
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },
    isArrayLike: function(obj) {
      return obj &&
        typeof obj === "object" &&
        (   obj.length === 0 ||
            typeof obj.length === "number" &&
            obj.length > 0 &&
            obj.length - 1 in obj );

    },
    each: function(collection, cb) {
      if ($.isArrayLike(collection)) {
        for (var i = 0; i < collection.length; i++) {
          if (cb.call(this, i, collection[i]) === false) {
            break;
          }
        }
      } else {
        for (var prop in collection) {
          if (collection.hasOwnProperty(prop)) {
            if (cb.call(this, prop, collection[prop]) === false) {
              break;
            }
          }
        }
      }
      return collection;
    },
    makeArray: function(arr) {
      if ($.isArray(arr)) {
        return arr;
      }
      var array = [];
      $.each(arr, function(i, item) {
        array[i] = item;
      });
      return array;
    },
    proxy: function(fn, context) {
      return function() {
        return fn.apply(context, arguments);
      };
    }
  });

  function makeTraverser(traverser) {
    return function() {
      var elements = [], args = arguments;
      $.each(this, function(i, element) {
        var els = traverser.apply(element, args);
        if ($.isArrayLike(els)) {
          elements.push.apply(elements, els);
        } else if (els) {
          elements.push(els);
        }
      });
      return $(elements);
    };
  }

  $.extend($.prototype, {
    html: function(newHtml) {
      if(arguments.length) {
        return $.each(this, function(i, element) {
          element.innerHTML = newHtml;
        });
      } else {
        return this[0].innerHTML;
      }
    },
    val: function(newVal) {
      if(arguments.length) {
        return $.each(this, function(i, element) {
          element.value = newVal;
        });
      } else {
        return this[0].value;
      }
    },
    text: function(newText) {
      if (arguments.length) {
        return $.each(this, function(i, element) {
          element.textContent = newText;
        });
      } else {
        return this[0].textContent;
      }
    },
    find: makeTraverser(function(selector) {
      return this.querySelectorAll(selector);
    }),
    parent: makeTraverser(function() {
      return this.parentNode;
    }),
    next: makeTraverser(function() {
      return this.nextElementSibling;
    }),
    prev: makeTraverser(function() {
      return this.previousElementSibling;
    }),
    children: makeTraverser(function() {
      return this.children;
    }),
    attr: function(attrName, value) {
      if (arguments.length == 2) {
        return $.each(this, function(i, element) {
          element.setAttribute(attrName, value);
        });
      } else {
        return this[0] && this[0].getAttribute(attrName);
      }
    },
    css: function(cssPropName, value) {
      if (arguments.length == 2) {
        return $.each(this, function(i, element) {
          element.style[cssPropName] = value;
        });
      } else {
        return this[0] &&
          window.getComputedStyle(this[0])
            .getPropertyValue(cssPropName);
      }
    },
    addClass: function(className) {
      return $.each(this, function(i, element) {
        element.classList.add(className);
      });
    },
    removeClass: function(className) {
      return $.each(this, function(i, element) {
        element.classList.remove(className);
      });
    },
    width: function() {
      var paddingLeft = parseInt(this.css("padding-left"), 10),
      paddingRight = parseInt(this.css("padding-right"), 10);
      return this[0].clientWidth - paddingLeft - paddingRight;
    },
    hide: function() {
      return this.css("display", "none");
    },
    show: function() {
      return this.css("display", "");
    },
    offset: function() {
      var offset = this[0].getBoundingClientRect();
      return {
        top: offset.top + window.pageYOffset,
        left: offset.left + window.pageXOffset
      };
    },
    bind: function(eventName, handler) {
      return $.each(this, function(i, element) {
        element.addEventListener(eventName, handler, false);
      });
    },
    unbind: function(eventName, handler) {
      return $.each(this, function(i, element) {
        element.removeEventListener(eventName, handler, false);
      });
    },
    is: function(selector){
      var matched = false;
      $.each(this, function(i, element){
        if( element.matches( selector) ) {
          matched = true;
        }
      });
      return matched;
    },
    data: (function(){
      var data = new WeakMap();
      return function(propName, value) {
        if (arguments.length == 2) {
          return $.each(this, function(i, el) {
            var elData = data.get(el);
            if (!elData) {
              elData = {};
              data.set(el, elData);
            }
            elData[propName] = value;
          });
        } else {
          var el = this[0], elData = data.get(el);
          return elData && elData[propName];
        }
      };
    })(),
    on: function(eventType, selector, handler) {
      // Create delegator function
      var delegator = function(ev) {
        var cur = ev.target;
        do {
          if ( $([ cur ]).is(selector) ) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      };

      return $.each(this, function(i, element) {
        // store delegators by event and selector in
        // $.data
        var events = $([ element ]).data("events"), eventTypeEvents;
        if (!events) {
          $([ element ]).data("events", events = {});
        }
        if (!(eventTypeEvents = events[eventType])) {
          eventTypeEvents = events[eventType] = {};
        }
        if (!eventTypeEvents[selector]) {
          eventTypeEvents[selector] = [];
        }
        eventTypeEvents[selector].push({
          handler: handler,
          delegator: delegator
        });
        element.addEventListener(eventType, delegator, false);
      });
    },
    off: function(eventType, selector, handler) {
      return $.each(this, function(i, element) {
        // Find the delegator object for the handler
        // and remove it.
        var events = $([ element ]).data("events");
        if (events[eventType] && events[eventType][selector]) {
          var delegates = events[eventType][selector], i = 0;
          while (i < delegates.length) {
            if (delegates[i].handler === handler) {
              element.removeEventListener(eventType, delegates[i].delegator, false);
              delegates.splice(i, 1);
            } else {
              i++;
            }
          }
        }
      });
    }
  });

})();
