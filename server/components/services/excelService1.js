/**
 * Created by assafgannon on 3/11/15.
 */

var excelbuilder = require('msexcel-builder');

module.exports = (function () {
  return {
    /**
     * Saves the TEQ questionnarie as an excel file
     * @param data
     * @param callback
     */
    saveAsExcel: function (name, group, data, callback) {
      // Create a new workbook file in current working-path
      var workbook = excelbuilder.createWorkbook('./.teq', name+'_'+group+'.xlsx')

      // Create a new worksheet with 10 columns and 12 rows

      var rows = 200,
        cols = 3;


      var sheet1 = workbook.createSheet(group, cols, rows);

      for(var i=1;i<=cols;i++){
        for(var j=1;j<=rows;j++){
          sheet1.font(i, j,
            {
              name: 'Verdana',
              sz: '10'
            });
        }
      }

      var row = 1;

      sheet1.set(1, row++, 'Tikal\'s DevOps Experience Questionnaire');

      row++;
      sheet1.set(1, row, 'Level Of Knowledge:\n' +
        '1-Basic\n' +
        '2-Developer\n' +
        '3-Expert');
      sheet1.wrap(1, row, 'true');
      sheet1.set(2, row, 'Subject');
      sheet1.set(3, row, 'Years of experience');
      sheet1.wrap(3, row, 'true');

      row++;

      for(var i=0;i<data.length;i++){
        sheet1.set(2, row++, data[i].title);
        for(var j=0;j<data[i].content.length;j++){
          sheet1.set(2, row++, data[i].content[j].title);
          for(var k=0;k<data[i].content[j].content.length;k++) {
            sheet1.set(2, row++, data[i].content[j].content[k].title);
          }
        }
      }




      // Save it
      workbook.save(function(err){
        if (err)
          workbook.cancel();
        else
          console.log('congratulations, your workbook created');
      });
      callback(null, rows);
    }
  }
})();
