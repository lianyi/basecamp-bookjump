'use strict';

var express = require('express');
const controller = require('./book.controller');
import * as auth from '../../auth/auth.service';
const router = express.Router();

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
