'use strict';

var _ = require('lodash');
var Candidate = require('./candidate.model');

// Get list of candidates
exports.index = function(req, res) {
  Candidate.find(function (err, candidates) {
    if(err) { return handleError(res, err); }
    return res.json(200, candidates);
  });
};

// Get a single candidate
exports.show = function(req, res) {
  Candidate.findById(req.params.id, function (err, candidate) {
    if(err) { return handleError(res, err); }
    if(!candidate) { return res.send(404); }
    return res.json(candidate);
  });
};

// Creates a new candidate in the DB.
exports.create = function(req, res) {
  Candidate.create(req.body, function(err, candidate) {
    if(err) { return handleError(res, err); }
    return res.json(201, candidate);
  });
};

// Updates an existing candidate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Candidate.findById(req.params.id, function (err, candidate) {
    if (err) { return handleError(res, err); }
    if(!candidate) { return res.send(404); }
    var updated = _.merge(candidate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, candidate);
    });
  });
};

// Deletes a candidate from the DB.
exports.destroy = function(req, res) {
  Candidate.findById(req.params.id, function (err, candidate) {
    if(err) { return handleError(res, err); }
    if(!candidate) { return res.send(404); }
    candidate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}