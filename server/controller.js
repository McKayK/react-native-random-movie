const { default: axios } = require("axios");

module.exports = {
  getMovie: (req, res) => {
    const randomNumber = Math.floor(Math.random() * 16 + 1);
    let randomNetflixPage;
    // const randomNetflixPage = Math.floor(Math.random() * 12 + 1);
    let movieId;
    let movie;
    const genre = req.query.genre;
    // const rating = req.query.rating;
    console.log(req.query.genre);
    const netflix = req.query.netflix;
    // console.log(rating);
    // console.log(Math.floor(Math.random() * 12 + 1));

    if (req.query.genre === "28") {
      randomNetflixPage = Math.floor(Math.random() * 12 + 1);
    } else if (req.query.genre === "35") {
      randomNetflixPage = Math.floor(Math.random() * 43 + 1);
    } else if (req.query.genre === "12") {
      randomNetflixPage = Math.floor(Math.random() * 9 + 1);
    } else if (req.query.genre === "18") {
      randomNetflixPage = Math.floor(Math.random() * 30 + 1);
    } else if (req.query.genre === "14") {
      randomNetflixPage = Math.floor(Math.random() * 6 + 1);
    } else if (req.query.genre === "878") {
      randomNetflixPage = Math.floor(Math.random() * 5 + 1);
    } else if (req.query.genre === "53") {
      randomNetflixPage = Math.floor(Math.random() * 14 + 1);
    } else if (req.query.genre === "99") {
      randomNetflixPage = Math.floor(Math.random() * 20 + 1);
    } else if (req.query.genre === "10749") {
      randomNetflixPage = Math.floor(Math.random() * 11 + 1);
    } else if (req.query.genre === "10752") {
      randomNetflixPage = Math.floor(Math.random() * 2 + 1);
    } else if (req.query.genre === "37") {
      randomNetflixPage = Math.floor(Math.random() * 1 + 1);
    } else if (req.query.genre === "16") {
      randomNetflixPage = Math.floor(Math.random() * 10 + 1);
    }

    //RATED R MOVIES
    // if (rating === true) {
    //   axios
    //     .get(
    //       `https://api.themoviedb.org/3/discover/movie?api_key=e03f559d7536a0d2b96e367744ab9bf8&with_genres=${genre}&include_adult=false&include_video=true&language=en-US&certification=R&certification_country=US&with_original_language=en&page=${randomNumber}&sort_by=popularity.desc`
    //     )
    //     .then((dbres) => {
    //       movieId = Math.floor(Math.random() * dbres.data.results.length);
    //       movie = dbres.data.results[movieId].id;
    //       // console.log("MOVIE", movie);
    //       axios
    //         .get(
    //           `https://api.themoviedb.org/3/movie/${movie}?api_key=e03f559d7536a0d2b96e367744ab9bf8&language=en-US&append_to_response=watch/providers,release_dates,videos,credits`
    //         )
    //         .then((secDbRes) => {
    //           // console.log(secDbRes.data);
    //           res.status(200).send(secDbRes.data);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     })
    //     .catch((err) => console.log(err));
    // }
    if (netflix === "true") {
      console.log("hit netflix");
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=e03f559d7536a0d2b96e367744ab9bf8&with_genres=${genre}&include_adult=false&include_video=true&language=en-US&with_original_language=en&page=${randomNetflixPage}&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`
        )
        .then((dbres) => {
          // console.log(dbres.data);
          res.status(200).send(dbres.data);
        })

        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=e03f559d7536a0d2b96e367744ab9bf8&with_genres=${genre}&include_adult=false&include_video=true&language=en-US&with_original_language=en&page=${randomNumber}&sort_by=popularity.desc`
        )
        .then((dbres) => {
          // console.log(dbres.data);
          res.status(200).send(dbres.data);
        })

        .catch((err) => console.log(err));
    }
  },
};
//     if (rating === true) {
//       axios
//         .get(
//           `https://api.themoviedb.org/3/discover/movie?api_key=e03f559d7536a0d2b96e367744ab9bf8&with_genres=${genre}&include_adult=false&include_video=true&language=en-US&certification=R&certification_country=US&with_original_language=en&page=${randomNumber}&sort_by=popularity.desc`
//         )
//         .then((dbres) => {
//           movieId = Math.floor(Math.random() * dbres.data.results.length);
//           movie = dbres.data.results[movieId].id;
//           // console.log("MOVIE", movie);
//           axios
//             .get(
//               `https://api.themoviedb.org/3/movie/${movie}?api_key=e03f559d7536a0d2b96e367744ab9bf8&language=en-US&append_to_response=watch/providers,release_dates,videos,credits`
//             )
//             .then((secDbRes) => {
//               // console.log(secDbRes.data);
//               res.status(200).send(secDbRes.data);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         })
//         .catch((err) => console.log(err));
//     } else {
//       axios
//         .get(
//           `https://api.themoviedb.org/3/discover/movie?api_key=e03f559d7536a0d2b96e367744ab9bf8&with_genres=${genre}&include_adult=false&include_video=true&language=en-US&with_original_language=en&page=${randomNumber}&sort_by=popularity.desc`
//         )
//         .then((dbres) => {
//           movieId = Math.floor(Math.random() * dbres.data.results.length);
//           movie = dbres.data.results[movieId].id;
//           // console.log("MOVIE", movie);
//           axios
//             .get(
//               `https://api.themoviedb.org/3/movie/${movie}?api_key=e03f559d7536a0d2b96e367744ab9bf8&language=en-US&append_to_response=watch/providers,release_dates,videos,credits`
//             )
//             .then((secDbRes) => {
//               // console.log(secDbRes.data);
//               res.status(200).send(secDbRes.data);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         })
//         .catch((err) => console.log(err));
//     }
//   },
// };
