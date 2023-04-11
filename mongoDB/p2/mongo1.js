const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/dat";

mongoose.connect(url, { useNewUrlParser: true }, (error) => {

    if (!error) {
        console.log("Success");
    }
    else {
        console.log("Error connecting to database ");
    }   
});     