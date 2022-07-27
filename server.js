const express = require('express');
const app = express();
const port = 3000
const fs = require('fs') // this engine requires the fs module like we did Saturday
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

app.get('/greeting',(req,res) => {
    res.send('Hello, stranger')
})

app.get('/greeting/:name',(req,res) => {
    res.send("What's up, " + req.params.name)
})


app.get('/tip/:total/:percentage',(req,res) => {
    let tip = req.params.total*(req.params.percentage/100)
    res.render('tip',{
       title:'tip', message: 'The total is ' + req.params.total +', and tabulated tip is ' + tip
    })
})

app.listen(3000, () => {
    console.log("I am listening on port")
})