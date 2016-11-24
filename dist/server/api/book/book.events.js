/**
 * Book model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _book = require('./book.model');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BookEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _book2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    BookEvents.emit(event + ':' + doc._id, doc);
    BookEvents.emit(event, doc);
  };
}

exports.default = BookEvents;
//# sourceMappingURL=book.events.js.map
