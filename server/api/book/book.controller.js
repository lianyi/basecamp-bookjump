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

import jsonpatch from 'fast-json-patch';
import Book from './book.model';
const googleBookSearch = require('googleapis').books('v1');

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
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
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
export function index(req, res) {
  //var userId = req.user._id;
  return Book.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a list of Books for a given user or logged in user
export function userIndex(req, res) {
  var userId = req.params.id || req.user._id;
  return Book.find({owner: userId}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Book from the DB
export function show(req, res) {
  return Book.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Book in the DB
export function create(req, res) {
  return Book.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Book in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Book.findOneAndUpdate({_id: req.params.id}, req.body, {
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Book in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Book.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Book from the DB
export function destroy(req, res) {
  return Book.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Search a Book from Google
export function search(req, res) {
  if (!process.env.GOOGLE_BOOKS_API_KEY) {
    console.error("process.env.GOOGLE_BOOKS_API_KEY is not provided");
    process.exit(-1);
  }
  googleBookSearch.volumes.list({
    auth: process.env.GOOGLE_BOOKS_API_KEY,
    q: req.params.search
  }, function (err, data) {
    try {
      Book.create({
        title: data.items[0].volumeInfo.title,
        owner: req.user._id,
        cover: data.items[0].volumeInfo.imageLinks ? data.items[0].volumeInfo.imageLinks.thumbnail : '',
        requested: false
      }).then(respondWithResult(res, 201))
        .catch(handleError(res, err));
    } catch (err) {
      handleError(res, err);
    }
  });
}
