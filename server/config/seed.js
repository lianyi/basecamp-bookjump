/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
//import User from '../api/user/user.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
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
