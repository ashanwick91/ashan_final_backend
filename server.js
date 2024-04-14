require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || "mongodb+srv://ashan:ashan123@cluster0.f7hw40s.mongodb.net/Books";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// import routes
const bookRouter = require('./routes/books');

// adding /activity to before all routes
app.use('/books', bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
