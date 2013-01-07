/**
 * Module dependencies.
 */
var express = require('express');
var fs = require("fs");
//routes
var routes = require('./routes');
var security =  require("./routes/security");
var userRoutes =  require("./routes/users");
var unitRoutes =  require("./routes/units");
var categoryRoutes = require("./routes/category");
var itemRoutes = require("./routes/item");

var MemStore =  require("connect/lib/middleware/session/memory")
var app = module.exports = express.createServer();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/expenditure');
var Users = require("./models/user");

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
      store : MemStore ({ reapInterval : 60000 * 10})
    })
  );
  app.use(app.router);

});

// disable layout
app.set("view options", {layout: false});

app.configure('development', function(){
  app.use(express.errorHandler(
  { 
    dumpExceptions: true, 
    showStack: true ,
  }));
  

});// end of configure

function myLogger(err, req, res, next) {
    var content = "[[ERROR]]--"+(new Date()).toString() + "\n"+ err.stack + "\n\n";
    console.log(content);
    fs.open( __dirname + '/log/error_log', 'a', 666, function( e, id ) {
      fs.write( id, content, null, 'utf8', function(){
        fs.close(id, function(){
          
        });
      });
    });
    next(err);
    res.send(500, { error: content});
    
}

app.configure('production', function(){
  app.use(express.errorHandler());
  //app.use(myLogger);
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

//expenditure 
app.get('/expenses', routes.getExpenses);
app.get('/expenses/:id', routes.getExpense);
app.post('/expenses', routes.createExpense);
app.put("/expenses/:id", routes.updateExpense);
app.delete("/expenses/:id", routes.deleteExpense);

//session related routes
app.get("/login",security.getLoginPage); 
app.post("/login",security.login);
app.get('/logout', security.logout);
app.get("/profile", security.getProfile)

//users
app.get("/users", userRoutes.getUsers);
app.get("/users/:id",userRoutes.getUser);
app.post("/users", userRoutes.createUser);
app.put("/users/:id", userRoutes.updateUser);
app.delete("/users/:id", userRoutes.deleteUser);

//units
app.get("/units", unitRoutes.getUnits);
app.get("/units/:id",unitRoutes.getUnit);
app.post("/units", unitRoutes.createUnit);
app.put("/units/:id", unitRoutes.updateUnit);
app.delete("/units/:id", unitRoutes.deleteUnit);

//category
app.get("/categories", categoryRoutes.getCategories);
app.get("/categories/:id",categoryRoutes.getCategory);
app.post("/categories", categoryRoutes.createCategory);
app.put("/categories/:id", categoryRoutes.updateCategory);
app.delete("/categories/:id", categoryRoutes.deleteCategory);

//items
app.get("/items", itemRoutes.getItems);
app.get("/items/:id", itemRoutes.getItem);
app.post("/items", itemRoutes.createItem);
app.put("/items/:id", itemRoutes.updateItem);
app.delete("/items/:id", itemRoutes.deleteItem);


//this is to test the sessions
app.get("/page", requiresLogin, function (req, res){
  res.send("Welcome to page")
});


app.listen(process.env.PORT || 3030 , function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
