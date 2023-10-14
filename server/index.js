const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();

const { getMovie } = require(`./controller`);

app.get(`/movie`, getMovie);

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
