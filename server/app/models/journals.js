// app/models/journals.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our journal model
var journalSchema = mongoose.Schema({
    journals            : {
        user_id        : String,
        journals     : String,
        updated_at : Date,
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Journals', journalSchema);
