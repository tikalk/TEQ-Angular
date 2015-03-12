/**
 * Created by assafgannon on 3/11/15.
 */

var test = require('tape');

var service = require('./excelService');
test('timing test', function (t) {
  var data = require('../../../questionnaires/DevOps.json');
  service.saveAsExcel('assaf', 'DevOps', data, function (err, file) {
    t.error(err);
    t.equals(file, 88);
    t.end();
  });
});
