const { default: axios } = require("axios");

module.exports = {
  getMovie: (req, res) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/122?api_key=e03f559d7536a0d2b96e367744ab9bf8&language=en-US&append_to_response=watch/providers,release_dates,videos,credits`
      )
      .then((dbres) => {
        // console.log(dbres.data);
        res.status(200).send(dbres.data);
      })
      .catch((err) => console.log(err));
  },
};
