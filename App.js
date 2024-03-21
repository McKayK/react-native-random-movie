import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import SignUpScreen from "./components/SignUpScreen";
import MovieCard from "./components/MovieCard";

//firebase
// const app = initializeApp(firebaseConfig);
import { app, auth } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import LoginScreen from "./components/LoginScreen";
import {
  getDatabase,
  onValue,
  ref,
  set,
  runTransaction,
} from "firebase/database";
import Watchlist from "./components/Watchlist";
import WatchlistMovie from "./components/WatchlistMovie";
import Popup from "./components/Popup";

export default function App() {
  const [movieData, setMovieData] = useState();
  const [movieDataWithId, setMovieDataWithId] = useState();
  const [movieStatus, setMovieStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [watchlist, setWatchlist] = useState();
  const [enterGetMovie, setEnterGetMovie] = useState(false);
  const [showWatchlistStatus, setShowWatchlistStatus] = useState(false);
  const [genre, setGenre] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [pageOfMovies, setPageOfMovies] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [popupStatus, setPopupStatus] = useState(false);

  //sign up
  const handleSignUp = (email, password, displayName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {
            console.log("Display name updated");
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
          });

        console.log(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
    setSignUpStatus(false);
  };
  //login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        // console.log("current user", user);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("hit");
        const user = userCredential.user;
        // console.log(user);

        console.log(`User logged in: ${user.uid}`);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(`Login error: ${error}`);
      });
  };

  const receiveGenre = (genre, netflix) => {
    // console.log("receive", genre);
    setGenre(genre);
    getMovieData(genre, netflix);
    // console.log(genre);
  };

  const getMovieData = (genre, netflix) => {
    console.log("movie data genre", genre);
    console.log("netflix", netflix);
    axios
      .get("http://192.168.1.22:3003/movie", {
        // .get("http://100.64.26.32:3003/movie", {
        params: {
          genre: genre,
          netflix: netflix,
        },
      })
      .then((res) => {
        console.log("total pages", res.data.results[2]);
        // const foundProduct = res.data.release_dates.results.find(
        //   (movie) => movie.iso_3166_1 === "US"
        // );
        // console.log(rating);
        // console.log(foundProduct.release_dates[0].certification);
        setMovieData(res.data.results);
        if (!movieStatus) {
          setMovieStatus(true);
        }
      })
      .catch((error) => console.log(error));
  };
  const getMovieDataWithId = (movieId) => {
    axios
      .get("http://192.168.1.22:3003/movieID", {
        // .get("http://100.64.26.32:3003/movie", {
        params: {
          movieId: movieId,
        },
      })
      .then((res) => {
        const trailer = res.data.videos.results;
        const trailer2 = trailer.filter(
          (trailer) => trailer.type === "Trailer"
        );

        // console.log("HIT GET MOVIE WITH ID", trailer2[0]);
        // const foundProduct = res.data.release_dates.results.find(
        //   (movie) => movie.iso_3166_1 === "US"
        // );
        // console.log(rating);
        // console.log(foundProduct.release_dates[0].certification);
        setMovieDataWithId(res.data);
        if (!movieStatus) {
          setMovieStatus(true);
        }
      })
      .catch((error) => console.log(error));
  };

  // //add to watchlist
  const addToWatchlist = (index) => {
    console.log("hit addtowatchlist");
    if (movieData) {
      const auth = getAuth();
      const user = auth.currentUser.uid;
      const db = getDatabase();
      const userRef = ref(db, `users/${user}/watchlist`);

      runTransaction(userRef, (currentData) => {
        const data = currentData || [];

        const movieId = movieData[index].original_title;

        const isAlreadyInWatchlist = data.some(
          (movie) => movie.original_title === movieId
        );

        if (!isAlreadyInWatchlist) {
          data.push(movieData[index]);
          setPopupMessage(
            `Added ${movieData[index].original_title} to your watchlist!`
          );
        } else {
          setPopupMessage(
            `${movieData[index].original_title} is already in your watchlist, YOU SHOULD PROBABLY WATCH IT!`
          );
          console.log(
            `${movieData[index].original_title} is already in the watchlist.`
          );
        }

        return data;
      })
        .then(() => {
          console.log(
            `Added ${movieData[index].original_title} to the watchlist.`
          );
        })
        .catch((error) => {
          console.error(`Error adding movie to watchlist: ${error}`);
        });

      // Read the existing watchlist
      // onValue(userRef, (snapshot) => {
      //   const data = snapshot.val() || [];
      //   if (!data.includes(movieData[index].original_title)) {
      //     data.push(movieData[index].original_title);
      //     set(userRef, data)
      //       .then(() => {
      //         alert(
      //           `Added ${movieData[index].original_title} to your watchlist!`
      //         );
      //         console.log(
      //           `Added ${movieData[index].original_title} to the watchlist.`
      //         );
      //       })
      //       .catch((error) => {
      //         console.error(`Error adding movie to watchlist: ${error}`);
      //       });
      //   } else {
      //     console.log(
      //       `${movieData[index].original_title} is already in the watchlist.`
      //     );
      //   }
      // });
    }
  };

  const showWatchlist = () => {
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const db = getDatabase();
    const userRef = ref(db, `users/${user}/watchlist`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setWatchlist(data);
    });
    setShowWatchlistStatus(true);
  };

  const deleteFromWatchlist = (movie) => {
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const db = getDatabase();
    const userRef = ref(db, `users/${user}/watchlist`);

    runTransaction(userRef, (currentData) => {
      const data = currentData || [];

      const updatedData = data.filter(
        (item) => item.original_title !== movie.original_title
      );
      return updatedData;
    })
      .then(() => {
        setPopupMessage(`Removed ${movie.original_title} from your watchlist!`);
        console.log(`Removed ${movie.original_title} from the watchlist.`);
      })
      .catch((error) => {
        console.error(`Error removing movie from watchlist: ${error}`);
      });
  };

  //animation
  const fadeAnim = new Animated.Value(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const hideTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }, 3000);
    return () => clearTimeout(hideTimeout);
  }, []);

  const handleX = () => {
    setMovieData();
    setMovieStatus(false);
  };

  const handleSignUpChange = () => {
    setSignUpStatus(true);
  };

  const handleLoginStatusChange = () => {
    setLoginStatus(true);
  };

  const handleBackSignUp = () => {
    setSignUpStatus(false);
  };

  const handleBackLogin = () => {
    setLoginStatus(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleWatchBack = () => {
    setWatchlist();
    setShowWatchlistStatus(false);
  };

  const getUserInfo = () => {
    const user = auth.currentUser;
    console.log(user);
  };

  const handleViewMovieCard = () => {
    setMovieData();
    if (enterGetMovie) {
      setEnterGetMovie(false);
    } else {
      setEnterGetMovie(true);
    }
  };

  const handlePopupStatus = () => {
    setPopupStatus(!popupStatus);
  };

  return (
    // SIGN UP SCREEN AFTER PRESSING SIGN UP FROM MAIN PAGE
    <View style={styles.container}>
      {signUpStatus && (
        <View>
          <SignUpScreen
            handleSignUp={handleSignUp}
            handleBackSignUp={handleBackSignUp}
          />
        </View>
      )}

      {/* LOGIN SCREEN AFTER PRESSING LOGIN BUTTON FROM MAIN PAGE */}
      {loginStatus && !isLoggedIn && !currentUser && (
        <View>
          <LoginScreen
            handleLogin={handleLogin}
            handleBackLogin={handleBackLogin}
          />
        </View>
      )}

      {/* LOGIN, SIGN UP SCREEN */}
      {!loginStatus && !signUpStatus && !visible && !isLoggedIn && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoginStatusChange}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUpChange}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* OPENING ANIMATION */}
      {visible && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={require("./images/movieicon.png")}
              style={styles.logo}
            />
          </Animated.View>
        </View>
      )}

      {/* MOVIE CARD, SHOWS LIST OF MOVIE GENRES AND RANDOM MOVIE GET BUTTON */}
      {enterGetMovie && (
        <MovieCard
          movieData={movieData}
          movieDataWithId={movieDataWithId}
          addToWatchlist={addToWatchlist}
          handleX={handleX}
          handleViewMovieCard={handleViewMovieCard}
          getMovieData={getMovieData}
          getMovieDataWithId={getMovieDataWithId}
          enterGetMovie={enterGetMovie}
          receiveGenre={receiveGenre}
          popupMessage={popupMessage}
        />
      )}

      {/* MAIN PAGE AFTER USER LOGS IN */}
      {!enterGetMovie && !visible && isLoggedIn && !showWatchlistStatus && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            {`Welcome, ${auth.currentUser.displayName}!`}
          </Text>
          {/* <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={handleViewMovieCard} style={styles.button}>
            <Text style={styles.buttonText}>Random Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={showWatchlist}>
            <Text style={styles.buttonText}>Watchlist</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SHOWS THE WATCH LIST OF THE USER */}
      {showWatchlistStatus && watchlist?.length > 0 && (
        <View style={styles.watchlistContainer}>
          {popupStatus && (
            <Popup
              popupMessage={popupMessage}
              handlePopupStatus={handlePopupStatus}
            />
          )}
          <ScrollView style={styles.scrollContainer}>
            {watchlist.map((movie, index) => {
              // console.log("WATCHLIST", movie.original_title);
              return (
                // <Text style={styles.title} key={index}>
                //   {movie.original_title}
                // </Text>
                <WatchlistMovie
                  movie={movie}
                  key={index}
                  deleteFromWatchlist={deleteFromWatchlist}
                  popupMessage={popupMessage}
                  handlePopupStatus={handlePopupStatus}
                />
              );
            })}
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={handleWatchBack}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
        </View>
      )}
      {!visible && (
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoutContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  watchlistContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollContainer: {
    maxHeight: Dimensions.get("window").height - 250,
    // flexDirection: "row",
  },
  button: {
    backgroundColor: "#009572",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 20,
    width: (screenWidth * buttonWidthPercentage) / 100,
    elevation: 3,
    shadowColor: "#10495C",
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#10495C",
    borderRadius: 0,
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#10495C",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    shadowColor: "#B28A28",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  moviePoster: {
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#B28A28",
    padding: 10,
    borderRadius: 100,
  },
  closeButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
  },
  backButton: {
    backgroundColor: "#B28A28",
    position: "absolute",
    top: 1,
    left: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
