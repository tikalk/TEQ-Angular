/**
 * Created by assafgannon on 3/11/15.
 */

var excelbuilder = require('msexcel-builder-fontfix');

var experties = {
  Basic: 1,
  Developer: 2,
  Expert: 3
}

module.exports = (function () {
  return {
    /**
     * Saves the TEQ questionnarie as an excel file
     * @param data
     * @param callback
     */
    saveAsExcel: function (name, group, data, callback) {
      // Create a new workbook file in current working-path
      name = name.replace(' ', '_');
      var filePath = [process.cwd()+'/.teq',name+'-TikalTeck_'+group+'.xlsx'];
      var workbook = excelbuilder.createWorkbook(filePath[0], filePath[1]);

      // Create a new worksheet with 10 columns and 12 rows

      var rows = 200,
        cols = 3;

      var sheet1 = workbook.createSheet(group, cols, rows);
      sheet1.width(1, 30);
      sheet1.width(2, 30);
      sheet1.width(3, 30);

      for(var i=1;i<=cols;i++){
        for(var j=1;j<=rows;j++){
          sheet1.font(i, j,
            {
              name: 'Verdana',
              family: '2',
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
      sheet1.fill(1, row, {type:'solid',fgColor:'FFFF00',bgColor:'64'});
      sheet1.font(1, row, {bold:'true'});

      sheet1.wrap(1, row, 'true');
      sheet1.set(2, row, 'Subject');
      sheet1.font(2, row, {bold:'true'});

      sheet1.set(3, row, 'Years of experience');
      sheet1.wrap(3, row, 'true');
      sheet1.fill(3, row, {type:'solid',fgColor:'FFFF00',bgColor:'64'});
      sheet1.font(3, row, {bold:'true'});

      row++;

      for(var i=0;i<data.length;i++){
        sheet1.fill(1, row, {type:'solid',fgColor:'FFDDDDDD',bgColor:'64'});
        sheet1.fill(2, row, {type:'solid',fgColor:'FFDDDDDD',bgColor:'64'});
        sheet1.fill(3, row, {type:'solid',fgColor:'FFDDDDDD',bgColor:'64'});
        sheet1.font(2, row, {bold:'true', fgColor: 'FFFF0000'});

        sheet1.set(2, row++, data[i].title);

        for(var j=0;j<data[i].content.length;j++){
          sheet1.fill(1, row, {type:'solid',fgColor:'FFFF0F0F0',bgColor:'64'});
          sheet1.fill(2, row, {type:'solid',fgColor:'FFFF0F0F0',bgColor:'64'});
          sheet1.fill(3, row, {type:'solid',fgColor:'FFFF0F0F0',bgColor:'64'});

          sheet1.set(2, row++, data[i].content[j].title);
          for(var k=0;k<data[i].content[j].content.length;k++) {
            var rowData = data[i].content[j].content[k];
            if(rowData.expertise){
              sheet1.set(1, row, experties[rowData.expertise]);
              sheet1.set(3, row, rowData.years);
            }
            if(rowData.otherTitle){
              sheet1.set(2, row, rowData.title);
            }else{
              sheet1.set(2, row, rowData.title);
            }
            row++;
          }
        }
      }

      // Save it
      workbook.save(function(err){
        if (err && err.length>0)
          workbook.cancel();
        else
          callback(null, filePath.join('/'));
      });
    }
  }
})();
