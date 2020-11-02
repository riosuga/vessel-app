const request = require("request")
const conn = require('../config/db')


var url = "https://sehati.hubla.dephub.go.id/Ais/GetPelabuhan"

exports.getPelabuhan = function(){
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        // console.log(body['features']) // Print the json response
	        // let data = []
	        for(var i = 0; i < body['features'].length; i++){
		    	//get geometry
		        let save_geomoetry = body['features'][i]['geometry'];
		        save_properties = body['features'][i]['properties'];

		        let save_pelabuhan  = {
		        		latitude : save_geomoetry['coordinates'][0], 
		        		longitude : save_geomoetry['coordinates'][1],
		        		kd_pelabuhan : save_properties['id'],
		        		nama_pelabuhan : save_properties['nama_pelabuhan'],
		        		nama_kabkota : save_properties['nama_kabkota']
		        }

		        let save_pelabuhan_insert = conn.insert("tr_pelabuhan", save_pelabuhan)
		        save_pelabuhan_insert.then(result => {
		        	console.log(save_properties['nama_pelabuhan'] + " status insert : "+ result)
		        })
		    }
	    }else{
	    	console.log('error :'+error)
	    }
	})
}

