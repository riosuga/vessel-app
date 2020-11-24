const fs = require('fs');
const puppeteer = require('puppeteer');
const model = require('../models/m_report')

const buildPathHtml = '../views/build-report/report.hbs'
const buildPathPdf  ='../views/build-report/report.pdf'

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


async function generateReport(kode_data){
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
      }else{
        console.log('Data Kosong Bero');
      }
			
		})
	} catch (error) {
		console.log('Error generating table', error);
	}
} 

const printPdf = async () => {
  console.log('Starting: Generating PDF Process, Kindly wait ..');
  /** Launch a headleass browser */
  const browser = await puppeteer.launch();
  /* 1- Ccreate a newPage() object. It is created in default browser context. */
  const page = await browser.newPage();
  /* 2- Will open our generated `.html` file in the new Page instance. */
  await page.goto('http://localhost:8000/report', { waitUntil: 'networkidle0' });
  /* 3- Take a snapshot of the PDF */
  const pdf = await page.pdf({
    format: 'A4',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  /* 4- Cleanup: close browser. */
  await browser.close();
  console.log('Ending: Generating PDF Process');
  return pdf;
};


generateReport('02');