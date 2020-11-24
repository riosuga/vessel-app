const fs = require('fs');

exports.getHTML = function(req, res){   
  res.render('build-report/report')
}