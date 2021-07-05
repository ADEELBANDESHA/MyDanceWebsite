const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 8000;

// defining contact scheema
const contactSchema = new mongoose.Schema({
    Name: String,
    phone: String,
    address: String,
    email: String,
    description: String
  });

const Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database");
    }).catch(()=>{
    res.status(400).send("Item could not be saved to the databse")
    });
});

// START THE SERVER
app.listen(port, () => {
    console.log(`server is started running successfully at port ${port}`)
})
