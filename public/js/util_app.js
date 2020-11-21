function showNotif(kd_err, message){
	if(kd_err == 'OK'){
		swal("Sukses",message, "success");
	}else if(kd_err == 'ER'){
		swal("Error",message, "error");
	}else{
		swal("Peringatan",message, "warning");
	}
}

function showDetailUser(id_user){
	$.ajax({
		url: '/user/detail_user',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_user : id_user}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#myModalAdd').modal('hide');
				$('#EditModal').modal('hide');
				$('#DeleteModal').modal('hide');


				$('input[name=id_user]').val(data.message[0]['id_user']);
				$('input[name=username]').val(data.message[0]['username']);
				$('input[name=password]').val(data.message[0]['password']);
				$('input[name=nama_pj]').val(data.message[0]['nama_pj']);
				$('input[name=perusahaan]').val(data.message[0]['perusahaan']);
				$('input[name=alamat_perusahaan]').val(data.message[0]['alamat_perusahaan']);
				$('input[name=contact]').val(data.message[0]['contact']);
				$('input[name=email]').val(data.message[0]['email']);
				$('input[name=role_user]').val(data.message[0]['role_user']);
				$('#myModalDetail').modal('show');

			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}


function showAddUser(){
	$('#EditModal').modal('hide');
	$('#DeleteModal').modal('hide');
	$('#myModalDetail').modal('hide');

	$('input[name=id_user]').val('');
	$('input[name=username]').val('');
	$('input[name=password]').val('');
	$('input[name=nama_pj]').val('');
	$('input[name=perusahaan]').val('');
	$('input[name=alamat_perusahaan]').val('');
	$('input[name=contact]').val('');
	$('input[name=email]').val('');
	$('input[name=role_user]').val('');
	$('#myModalAdd').modal('show');
}


function showUpdate(id_user){
	$.ajax({
		url: '/user/detail_user',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_user : id_user}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#myModalAdd').modal('hide');
				$('#DeleteModal').modal('hide');
				$('#myModalDetail').modal('hide');

				$('input[name=id_user]').val(data.message[0]['id_user']);
				$('input[name=username]').val(data.message[0]['username']);
				$('input[name=password]').val(data.message[0]['password']);
				$('input[name=nama_pj]').val(data.message[0]['nama_pj']);
				$('input[name=perusahaan]').val(data.message[0]['perusahaan']);
				$('input[name=alamat_perusahaan]').val(data.message[0]['alamat_perusahaan']);
				$('input[name=contact]').val(data.message[0]['contact']);
				$('input[name=email]').val(data.message[0]['email']);
				$('input[name=role_user]').val(data.message[0]['role_user']);

				$('#EditModal').modal('show');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}

function showDelete(id_user){
	$.ajax({
		url: '/user/detail_user',
		type: 'POST',
		timeout: 60000,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data : JSON.stringify({id_user : id_user}),
		success: function (data) {
			if(data === undefined || data.length == 0){
				showNotif('ER', 'Data tidak ditemukan');
			}else{
				$('#myModalAdd').modal('hide');
				$('#EditModal').modal('hide');
				$('#myModalDetail').modal('hide');

				$('input[name=id_user]').val(data.message[0]['id_user']);
				$('input[name=username]').val(data.message[0]['username']);
				$('input[name=password]').val(data.message[0]['password']);
				$('input[name=nama_pj]').val(data.message[0]['nama_pj']);
				$('input[name=perusahaan]').val(data.message[0]['perusahaan']);
				$('input[name=alamat_perusahaan]').val(data.message[0]['alamat_perusahaan']);
				$('input[name=contact]').val(data.message[0]['contact']);
				$('input[name=email]').val(data.message[0]['email']);
				$('input[name=role_user]').val(data.message[0]['role_user']);
				

				$('#DeleteModal').modal('show');

			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			showNotif('ER', xhr.status +'\n'+ thrownError);
		}

	});
}



$(document).ready(function() {
    $('.select2').select2();
    $('#mytable').dataTable();
});