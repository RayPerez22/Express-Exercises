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
      .replace('#message#', '<h1>' + options.message + '</h1>').replace()
      .replace('#a#',`<a href= ${options.link}> ${options.content} </a>` )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

app.get('/',(req,res) => {
    res.render('template',{
        title:'pass it around', message:'99 Bottles of beer on the wall', content:'take one down, pass it around', link:`/98`})
})

app.get('/:num',(req, res) => {
  res.render('template', {title:`pass it around`, message:` ${req.params.num}Bottles of beer on the wall`, link:`/${req.params.num - 1}`, a:``, content:`Take a beer and pass it around`})
})
app.listen(3000, () => {
    console.log("I am listening on port")
})