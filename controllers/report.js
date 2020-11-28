const fs = require('fs');
const puppeteer = require('puppeteer');
const util = require('../util/util')
const model = require('../models/m_report')
const hbs = require('hbs')

const buildPathHtml = './views/build-report/report.hbs'
const buildPathPdf  ='./views/build-report/report.pdf'

function createField(fields){
  let string = '<tr>'
  for(let i = 0; i < fields.length; i++){
     string +='<td>'+fields[i]+'</td>'
  }

  string += '</tr>'

  return string
}

function createRows(fields, rows){
  let string = ''
  for(let i = 0; i < rows.length; i++ ){
    string += '<tr>'
      for(let j = 0; j < fields.length; j++){
        string += '<td>'+rows[i][fields[j]]+'</td>'
      }

    string += '</tr>'
  }
  
  return string
}

function createTable(fields, rows){
  return '<table>'+fields+rows+'</table>'
}

const createHtml = (table) => `
  <html>
    <head>
      <style>
        table {
          width: 100%;
        }
        tr {
          text-align: left;
          border: 1px solid black;
        }
        th, td {
          padding: 15px;
        }
        tr:nth-child(odd) {
          background: #CCC
        }
        tr:nth-child(even) {
          background: #FFF
        }
        .no-content {
          background-color: red;
        }
      </style>
    </head>
    <body>
    <table width="100%">
      <tr>
      <td align="center" style ="background: #FFF"><img style="display:block; vertical-align: bottom;" src="/static/image/logo5.jpg" width="100%"></td>
      </tr>
    </table>
    <hr>
      ${table}
    </body>
  </html>
`;

const doesFileExist = (filePath) => {
	try {
		fs.statSync(filePath); // get information of the specified file path.
		return true;
	} catch (error) {
		return false;
	}
};

const printPdf = async () => {
  console.log('Starting: Generating PDF Process, Kindly wait ..');
  /** Launch a headleass browser */
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  /* 1- Ccreate a newPage() object. It is created in default browser context. */
  const page = await browser.newPage();
  /* 2- Will open our generated `.html` file in the new Page instance. */
  await page.goto('http://localhost:8000/gen_html', { waitUntil: 'networkidle0' });
  /* 3- Take a snapshot of the PDF */
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '100px',
      bottom: '200px',
      right: '30px',
      left: '30px',
    }
  });
  /* 4- Cleanup: close browser. */
  await browser.close();
  console.log('Ending: Generating PDF Process');
  return pdf;
};


//untuk test
async function generateReport(kode_data, res){
  try {
    model.getData(kode_data , async function(err, data){
      // console.log(data.result)

      if(data.result.length > 0){

        if (doesFileExist(buildPathHtml)) {
          console.log('Deleting old build file');
        }


        var uniqueKeys = Object.keys(data.result.reduce(function(result, obj) {
          return Object.assign(result, obj);
        }, {}))

        const fields = createField(uniqueKeys)
        const rows = createRows(uniqueKeys, data.result)
        const table = createTable(fields,rows)

        const html = createHtml(table)

        // console.log(html)
        fs.writeFileSync(buildPathHtml, html);
        console.log('Succesfully created an HTML table');

        const pdf = await printPdf();
        fs.writeFileSync(buildPathPdf, pdf);
        console.log('Succesfully created an PDF table');

        // const file = fs.createReadStream('./views/build-report/report.pdf');
        // const stat = fs.statSync('./views/build-report/report.pdf');
        // res.setHeader('Content-Length', stat.size);
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        // file.pipe(res);
        // res.download('./views/build-report/report.pdf')
        // console.log('end of content pdf and dowload it')
        res.send(JSON.stringify({kode : '200', message : 'OK'}))

      }else{
        res.send(JSON.stringify({kode : '500', message : 'Data Kosong'}))
        console.log('Data Kosong Bero');
      }
      
    })
  } catch (error) {
    res.send(JSON.stringify({kode : '500', message : 'Error dalam generate PDF'}))
    console.log('Error generating table', error);
  }
} 

// generateReport('02');
// yang beneran
exports.getHTML = function(req, res){   
  res.render('build-report/report')
}

exports.report = function(req,res){
  let sess = util.writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( './views/layout/report.html', 'utf8'));
  res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user']})
}

exports.genReport = async function(req,res){
  let type_data = req.body.type_data
  
  await generateReport(type_data,res)
}

exports.getFile = function(req,res){
  const file = fs.createReadStream('./views/build-report/report.pdf');
  const stat = fs.statSync('./views/build-report/report.pdf');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  file.pipe(res);
}

exports.test = function(req, res){
  console.log(req);
  res.send('OK')
}