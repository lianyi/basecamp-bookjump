/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/books              ->  index
 * POST    /api/books              ->  create
 * GET     /api/books/:id          ->  show
 * PUT     /api/books/:id          ->  upsert
 * PATCH   /api/books/:id          ->  patch
 * DELETE  /api/books/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.userIndex = userIndex;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;
exports.search = search;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _book = require('./book.model');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleBookSearch = require('googleapis').books('v1');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Books
function index(req, res) {
  //var userId = req.user._id;
  return _book2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}
// Gets a list of Books for a given user or logged in user
function userIndex(req, res) {
  var userId = req.params.id || req.user._id;
  return _book2.default.find({ owner: userId }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Book from the DB
function show(req, res) {
  return _book2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Book in the DB
function create(req, res) {
  return _book2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Book in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _book2.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Book in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _book2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Book from the DB
function destroy(req, res) {
  return _book2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

// Search a Book from Google
function search(req, res) {
  if (!process.env.GOOGLE_BOOKS_API_KEY) {
    console.error("process.env.GOOGLE_BOOKS_API_KEY is not provided");
    process.exit(-1);
  }
  googleBookSearch.volumes.list({
    auth: process.env.GOOGLE_BOOKS_API_KEY, //dont forget to enable google books api
    q: req.params.search
  }, function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    try {
      _book2.default.create({
        title: data.items[0].volumeInfo.title,
        owner: req.user._id,
        cover: data.items[0].volumeInfo.imageLinks ? data.items[0].volumeInfo.imageLinks.thumbnail : '',
        requested: false
      }).then(respondWithResult(res, 201)).catch(handleError(res, err));
    } catch (err) {
      handleError(res, err);
    }
  });
}
//# sourceMappingURL=book.controller.js.map
