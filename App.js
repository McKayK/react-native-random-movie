import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import SignUpScreen from "./components/SignUpScreen";

//firebase
// const app = initializeApp(firebaseConfig);
import { app, auth } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  inMemoryPersistence,
  setPersistence,
  onIdTokenChanged,
  AuthPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import LoginScreen from "./components/LoginScreen";
import { getDatabase, onValue, ref, set } from "firebase/database";

export default function App() {
  const [movieData, setMovieData] = useState();
  const [movieStatus, setMovieStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [watchlist, setWatchlist] = useState();

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

  const getMovieData = () => {
    axios
      .get("http://192.168.1.27:3003/movie")
      .then((res) => {
        // console.log(res.data);
        setMovieData(res.data);
        if (!movieStatus) {
          setMovieStatus(true);
        }
      })
      .catch((error) => console.log(error));
  };

  //add to watchlist
  const addToWatchlist = () => {
    if (movieData) {
      const auth = getAuth();
      const user = auth.currentUser.uid;
      const db = getDatabase();
      const userRef = ref(db, `users/${user}/watchlist`);

      // Read the existing watchlist
      onValue(userRef, (snapshot) => {
        const data = snapshot.val() || [];
        if (!data.includes(movieData.original_title)) {
          data.push(movieData.original_title);
          set(userRef, data)
            .then(() => {
              console.log(
                `Added ${movieData.original_title} to the watchlist.`
              );
            })
            .catch((error) => {
              console.error(`Error adding movie to watchlist: ${error}`);
            });
        } else {
          console.log(
            `${movieData.original_title} is already in the watchlist.`
          );
        }
      });
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
    console.log("hit");
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
  };

  const getUserInfo = () => {
    const user = auth.currentUser;
    console.log(user);
  };

  return (
    <View style={styles.container}>
      {signUpStatus && (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleBackSignUp}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <SignUpScreen handleSignUp={handleSignUp} />
        </View>
      )}
      {loginStatus && !isLoggedIn && (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleBackLogin}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <LoginScreen handleLogin={handleLogin} />
        </View>
      )}
      {!loginStatus && !signUpStatus && !visible && (
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
      {movieStatus && (
        <View style={styles.container}>
          <Text style={styles.title}>{movieData.original_title}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
              }}
              style={styles.moviePoster}
            />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleX}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {movieData && (
            <TouchableOpacity style={styles.button} onPress={addToWatchlist}>
              <Text style={styles.buttonText}>Add To Watchlist</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {!movieStatus && !visible && isLoggedIn && !watchlist && (
        <View>
          <Text style={styles.title}>
            {`Welcome, ${auth.currentUser.displayName}!`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getMovieData} style={styles.button}>
            <Text style={styles.buttonText}>Get Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={showWatchlist}>
            <Text style={styles.buttonText}>Show Watchlist</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={getUserInfo}>
            <Text>Get user info</Text>
          </TouchableOpacity> */}
        </View>
      )}
      {watchlist && (
        <View style={styles.container}>
          {watchlist.map((movie) => {
            return <Text style={styles.title}>{movie}</Text>;
          })}
          <TouchableOpacity style={styles.button} onPress={handleWatchBack}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#B28A28",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
