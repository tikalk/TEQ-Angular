'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionnaireSchema = new Schema({
  name: String,
  group: String,
  data: Object
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
