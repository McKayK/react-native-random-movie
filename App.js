import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

//firebase
// const app = initializeApp(firebaseConfig);
import { database, app, auth } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { ref, set } from "firebase/database";
import SignUpScreen from "./components/SignUpScreen";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const [movieData, setMovieData] = useState();
  const [movieStatus, setMovieStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        const user = userCredential.user;
        console.log(user);
        console.log(`User logged in: ${user.uid}`);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(`Login error: ${error}`);
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
        setIsLoggedIn(false); // Clear the user state
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleSignUpChange}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {visible && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
        </View>
      )}
      {!movieStatus && !visible && isLoggedIn && (
        <View>
          <Text
            style={styles.title}
          >{`Welcome, ${auth.currentUser.displayName}!`}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getMovieData} style={styles.button}>
            <Text style={styles.buttonText}>Get Movie</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={getUserInfo}>
            <Text>Get user info</Text>
          </TouchableOpacity> */}
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
