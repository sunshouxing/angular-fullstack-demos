/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/gallery              ->  index
 * POST    /api/gallery              ->  create
 * GET     /api/gallery/:id          ->  show
 * PUT     /api/gallery/:id          ->  upsert
 * PATCH   /api/gallery/:id          ->  patch
 * DELETE  /api/gallery/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Slide from './gallery.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Gallerys
export function index(req, res) {
  return Slide.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Slide from the DB
export function show(req, res) {
  return Slide.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Slide in the DB
export function create(req, res) {
  var slide = req.body;
  var imagePath = req.file.path;
  // change upload path to static file path
  // client/assets/images/* => assets/images/*
  slide.image = imagePath.slice(7);

  return Slide.create(slide)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Slide in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Slide.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Slide in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Slide.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Slide from the DB
export function destroy(req, res) {
  return Slide.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
