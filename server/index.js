const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();

const { getMovie, getMovieWithId } = require(`./controller`);

app.get(`/movie`, getMovie);
app.get(`/movieID`, getMovieWithId);

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
