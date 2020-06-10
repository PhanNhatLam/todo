module.exports.postCreate = function(req, res, next) {
  var phone = Number(req.body.phone);
  
  var errors = [];
  
  if (!req.body.name) {
    errors.push('Vui lòng nhập tên!');
  }
  
  if (req.body.name.length > 30) {
    errors.push('Tên quá dài, vui lòng nhập lại!')
  }
  
  if (!req.body.phone) {
    errors.push('Vui lòng nhập số điện thoại!');
  }
  
  if (Number.isNaN(phone)) {
    errors.push('Điện thoại phải là số!')
  }
  
  if (errors.length) {
    return res.render("users/create", {
      errors,
      values: req.body
    })
  }
  
  next();
}