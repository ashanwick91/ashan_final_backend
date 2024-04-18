const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const artSchema = new Schema({
  artName: { type: String },
  serial: { type: Number },
  src: { type: String, required: true },
  alt: { type: String },
  bids: [
    {
      user: { type: String, required: true },
      bid: { type: Number, required: true },
    },
  ],
});

const Art = mongoose.model("artrecords", artSchema);
module.exports = Art;
