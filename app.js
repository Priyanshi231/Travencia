const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing");

app.use(express());

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/testlisting", async(req,res) =>{
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "A beautiful villa with sea view",
        price: 1200,
        location: "Calangute, Goa",
        country: "India"
    });

    await sampleListing.save();
    console.log("sample saved");
    res.send("succesful");
})

app.get("/" ,(req,res) => {
    res.send("Hello, World!");
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
