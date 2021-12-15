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
    Contact.find({}, function(err, contacts) {
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
    console.log(req.query);
    let phone = req.query.phone;
    let name = req.query.name;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone && contact.name == name);

    if(contactList != -1) {
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
});


app.post('/create-contact', function(req, res) {
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    }, function(err, newContact) {
        if(err) {
            console.log("Error in creating contact.");
            return;
        }
        console.log('*****\n',newContact);
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