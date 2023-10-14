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

export default function App() {
  const [movieData, setMovieData] = useState();
  const [movieStatus, setMovieStatus] = useState(false);

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

  return (
    <View style={styles.container}>
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
      {!movieStatus && !visible && (
        <TouchableOpacity onPress={getMovieData} style={styles.button}>
          <Text style={styles.buttonText}>Get Movie</Text>
        </TouchableOpacity>
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
});
