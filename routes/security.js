var users =  require("../lib/users");
exports.getLoginPage =   function (req, res){
  res.render("login.html");
}

exports.login  = function (req, res){
  var login =  req.body.username;
  var pass = req.body.password;
  users.authenticate(login,pass, function(user){
    if (user){
      req.session.user = user;
      res.redirect("/")
    }else {
      res.redirect("/login") 
    }
  });
}

exports.logout = function (req, res){
  delete req.session.user;
  res.redirect("/login")
}