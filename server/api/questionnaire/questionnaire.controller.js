'use strict';

var _ = require('lodash');
var Questionnaire = require('./questionnaire.model'),
  async = require('async'),
  xlsx = require('../../components/services/excelService'),
  email = require('../../components/services/emailService'),
  atob = require('atob');

// Get list of questionnaires
exports.index = function(req, res) {
  Questionnaire.find(function (err, questionnaires) {
    if(err) { return handleError(res, err); }
    return res.json(200, questionnaires);
  });
};

// Get a single questionnaire
exports.show = function(req, res) {
  Questionnaire.findById(req.params.id, function (err, questionnaire) {
    if(err) { return handleError(res, err); }
    if(!questionnaire) { return res.send(404); }
    return res.json(questionnaire);
  });
};

// Creates a new questionnaire in the DB.
exports.create = function(req, res) {
  var replyToEmail = atob(req.body.replyTo);
  delete req.body.replyTo;
  var filePath;

  async.series([
      //Save in DB
      function (next) {
        Questionnaire.create(req.body, function(err, questionnaire) {
          next(err);
        });
      },
      //create xlsx
      function (next) {
        xlsx.saveAsExcel(req.body.name, req.body.group, req.body.data, function (err, file) {
          filePath = file;
          next(err)
        });
      },
      //send email
      function (next) {
        email.sendEmail(replyToEmail, req.body.name, filePath, next)
      },
      //delete xlsx
      function (next) {

      }
    ],
    function (err) {
      if(err) {
        console.error(err);
        return handleError(res, err);
      }
      return res.send(200);
    }
  );

};

// Updates an existing questionnaire in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Questionnaire.findById(req.params.id, function (err, questionnaire) {
    if (err) { return handleError(res, err); }
    if(!questionnaire) { return res.send(404); }
    var updated = _.merge(questionnaire, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, questionnaire);
    });
  });
};

// Deletes a questionnaire from the DB.
exports.destroy = function(req, res) {
  Questionnaire.findById(req.params.id, function (err, questionnaire) {
    if(err) { return handleError(res, err); }
    if(!questionnaire) { return res.send(404); }
    questionnaire.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
