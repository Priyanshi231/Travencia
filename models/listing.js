const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
        "https://unsplash.com/photos/white-building-photographt-MXbM1NrRqtI",
    set : (v) =>
      v === ""
        ? "https://unsplash.com/photos/white-building-photographt-MXbM1NrRqtI"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
