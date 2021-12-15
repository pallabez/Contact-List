/*const mongoose = require('mongoose');                       //require the library
mongoose.connect('mongodb://localhost/contacts_list_db');   //connect to the db

const db = mongoose.connection;                             //Get connection log

db.on('error', console.error.bind(console.error, 'db connection failed'));      //check if there is any error
db.openUri('open', function() {                                                 //if there is no error
    console.log('Sucessfully connected to the database');
});*/


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contacts_list_db');
}