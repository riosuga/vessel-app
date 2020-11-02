function showNotif(kd_err, message){
	if(kd_err == 'OK'){
		swal("Sukses",message, "success");
	}else if(kd_err == 'ER'){
		swal("Error",message, "error");
	}else{
		swal("Peringatan",message, "warning");
	}
}

$(document).ready(function() {
    $('.select2').select2();
});