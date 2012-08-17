
/**
 * Module dependencies.
 */
var express = require('express')
var routes = require('./routes');
var security =  require("./routes/security");
var MemStore =  require("connect/lib/middleware/session/memory")
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session(
    {
      secret : "some secret",
      store : MemStore ({
                reapInterval : 60000 * 10
              })
    })
  );
  app.use(app.router);
});

// disable layout
app.set("view options", {layout: false});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//make a custom html template
app.register('.html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
});


//routes middleware
function requiresLogin(req,res,next){
  if(req.session.user){
    next();
  }else {
    res.redirect("/login");
  }
}

// Routes
app.get('/', requiresLogin ,routes.index);

app.get('/expenses', routes.getExpenses);
app.get('/expenses/:id', routes.getExpense);
app.post('/expenses', routes.addExpense);
app.put("/expenses/:id", routes.updateExpense);
app.delete("/expenses/:id", routes.deleteExpense);

//session related routes
app.get("/login",security.getLoginPage); 
app.post("/login",security.login);
app.get('/logout', security.logout);

//this is to test the sessions
app.get("/page", requiresLogin, function (req, res){
  res.send("Welcome to page")
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
