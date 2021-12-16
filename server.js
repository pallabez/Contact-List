const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose')     //needs to be above express
const Contact = require('./models/contact.js');

const app = express();

app.set('view engine', 'ejs');          //Create view engine property and set it to ejs
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


class Contacts {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}

var contactList = [
    new Contacts('Pallab', '124897219'),
    new Contacts('Abinabh', '390868437'),
]

app.get('/', function(req, res) {
    Contact.find({}, function(err, contacts) {      //find({name: new}, ) To display contacts with new name
        if(err) {
            console.log("Error in fetching contact");
            return;
        }

        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts,
        });
    });
});

app.get('/delete-contact', function(req, res) {
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log("Error in deleting the contact.");
            return;
        }

        return res.redirect('back');
    });
});


app.post('/create-contact', function(req, res) {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    }, function(err, newContact) {
        if(err) {
            console.log("Error in creating contact.");
            return;
        }
        res.redirect('back');
    });
});

app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server', err);
        return;
    }
    console.log("Server is running on port :", port);
});