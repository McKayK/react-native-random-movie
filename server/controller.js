const { default: axios } = require("axios");

module.exports = {
  getMovie: (req, res) => {
    const randomNumber = Math.floor(Math.random() * 501 + 1);
    let movieId;
    let movie;
    const genre = req.query.genre;

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=e03f559d7536a0d2b96e367744ab9bf8&with_genres=${genre}&certification_country=US&certification=R&include_adult=false&include_video=true&language=en-US&with_original_language=en&page=${randomNumber}&sort_by=popularity.desc`
      )
      .then((dbres) => {
        movieId = Math.floor(Math.random() * dbres.data.results.length);
        movie = dbres.data.results[movieId].id;
        // console.log("MOVIE", movie);
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie}?api_key=e03f559d7536a0d2b96e367744ab9bf8&language=en-US&append_to_response=watch/providers,release_dates,videos,credits`
          )
          .then((secDbRes) => {
            console.log(secDbRes.data);
            res.status(200).send(secDbRes.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  },
};
