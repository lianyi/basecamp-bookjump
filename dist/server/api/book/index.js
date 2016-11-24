'use strict';

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./book.controller');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/user/:id', auth.isAuthenticated(), controller.userIndex);
router.get('/add/:search', auth.isAuthenticated(), controller.search);
router.put('/:id', auth.isAuthenticated(), controller.upsert);

//No need the following routes
// router.get('/:id', auth.isAuthenticated(), controller.show);
// router.post('/', auth.isAuthenticated(), controller.create);
// router.patch('/:id', auth.isAuthenticated(), controller.patch);
// router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
