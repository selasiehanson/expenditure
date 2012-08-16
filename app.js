
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
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

// Routes
app.get('/', routes.index);

app.get('/expenses', routes.getExpenses);
app.get('/expenses/:id', routes.getExpense);
app.post('/expenses', routes.addExpense);
app.put("/expenses/:id", routes.updateExpense);
app.delete("/expenses/:id", routes.deleteExpense);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
