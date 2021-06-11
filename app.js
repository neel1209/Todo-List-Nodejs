const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", " Eat Food"];
const workItems = [];
app.get('/', function(req, res) {

  const keyDay = date.getDate();
  res.render('list', {
    listTitle: keyDay,
    newListItems: items,
  });
});

app.post('/', function(req, res) {
  let item = req.body.newListElement;

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect("/Work")
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/Work', function(req, res) {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  })
});

app.get('/About', function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
