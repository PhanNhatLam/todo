// bạn viết nó như controller ấy nhưng xài next() ở cuối để  tiếp túc route
// bạn nên khai báo cái biến đó ở ngoài chứ này mỗi lần mình trỏ tới cái route này nó
// biến i sẽ được khai báo về 0 lại á
var count = 0;

module.exports.cookie = function(req, res, next) {
  res.cookie('id', count += 1);
  console.log(req.cookies);
  
  next();
}
