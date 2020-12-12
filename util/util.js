exports.writeSessionOrang = function(req, res){
  let data_user = JSON.parse(JSON.stringify(req.user))
  // console.log(data_user)
  return data_user[0];
}