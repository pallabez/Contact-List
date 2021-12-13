const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');          //Create view engine property and set it to ejs
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.use(function(req, res, next) {
    console.log('Middleware 1');
    next();
});

class Contact {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}

var contactList = [
    new Contact('Pallab', '124897219'),
    new Contact('Abinabh', '390868437'),
]

app.get('/', function(req, res) {
    return res.render('home', {
        title: "Contact List",
        contact_list: contactList,
    });
});

app.post('/create-contact', function(req, res) {
    contactList.push(req.body);
    res.redirect('/')
});

app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server', err);
        return;
    }
    console.log("Server is running on port :", port);
});