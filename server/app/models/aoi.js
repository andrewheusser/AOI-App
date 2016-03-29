var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aoiSchema = new Schema({
  Title:  String,
  Journal:  String,
  Authors: String,
  Abstract:   String,
  URL:  String,
  Year: String,
  PMID: String,
  AddedBy: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Aoi', aoiSchema);
