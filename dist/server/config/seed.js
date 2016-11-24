/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _thing = require('../api/thing/thing.model');

var _thing2 = _interopRequireDefault(_thing);

var _book = require('../api/book/book.model');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_thing2.default.find({}).remove().then(function () {
  _thing2.default.create({
    name: 'Catalogue your books online',
    info: 'Catalogue your books online.'
  }, {
    name: 'See all of the books our users own',
    info: 'See all of the books our users own.'
  }, {
    name: 'Request to borrow other users\' books',
    info: 'Request to borrow other users\' books'
  }, {
    name: 'Manage books and requests from your dashboard',
    info: 'manage books and requests from your dashboard'
  }, {
    name: 'Open Source',
    info: 'Open Source'
  });
});
//
// User.find({}).remove()
//   .then(() => {
//     User.create({
//       provider: 'local',
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'test'
//     }, {
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin'
//     })
//       .then(() => {
//         console.log('finished populating users');
//       });
//   });
//

//import User from '../api/user/user.model';

_book2.default.find({}).remove().then(function () {
  _book2.default.create({
    title: 'local',
    requested: false
  }).then(function () {
    console.log('finished populating books');
  });
});
//# sourceMappingURL=seed.js.map
