import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const MovieCard = ({
  movieData,
  addToWatchlist,
  handleX,
  handleViewMovieCard,
  getMovieData,
  enterGetMovie,
  receiveGenre,
}) => {
  const [ratedRSwitch, setRatedRSwitch] = useState(false);
  const [background, setBackground] = useState();
  const [dropdown, setDropdown] = useState("");
  const dropdownOptions = [
    { label: "Action", number: 28 },
    { label: "Comedy", number: 35 },
    { label: "Adventure", number: 12 },
    { label: "Drama", number: 18 },
    { label: "Fantasy", number: 14 },
    { label: "Sci-Fi", number: 878 },
    { label: "Thriller", number: 53 },
    { label: "Documentary", number: 99 },
    { label: "Chick-Flick", number: 10749 },
    { label: "War", number: 10752 },
    { label: "Western", number: 37 },
    { label: "Animation", number: 16 },
  ];

  const toggleRatedR = () => {
    if (ratedRSwitch) {
      setRatedRSwitch(false);
    } else {
      setRatedRSwitch(true);
    }
    console.log("hit", ratedRSwitch);
  };

  const handleCleardropdownAndX = () => {
    handleX();
    setDropdown("");
  };

  const sendGenre = () => {
    receiveGenre(dropdown, ratedRSwitch);
    // getMovieData();
  };

  const handleSendGenreAndMovieData = () => {
    sendGenre();
  };
  return (
    <View style={styles.container}>
      {enterGetMovie && !movieData && (
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imgBackground}
        >
          <View style={styles.container}>
            <Picker
              selectedValue={dropdown}
              onValueChange={(itemValue, itemIndex) => {
                setDropdown(itemValue);
                if (itemValue === 28) {
                  setBackground(require("../images/action.jpg"));
                } else if (itemValue === 35) {
                  setBackground(require("../images/comedy.jpg"));
                } else if (itemValue === 12) {
                  setBackground(require("../images/adventure.jpg"));
                } else if (itemValue === 18) {
                  setBackground(require("../images/drama.jpg"));
                } else if (itemValue === 14) {
                  setBackground(require("../images/fantasy.jpg"));
                } else if (itemValue === 878) {
                  setBackground(require("../images/scifi.jpeg"));
                } else if (itemValue === 53) {
                  setBackground(require("../images/thriller.jpg"));
                } else if (itemValue === 99) {
                  setBackground(require("../images/documentary.jpg"));
                } else if (itemValue === 10749) {
                  setBackground(require("../images/chickflick.jpg"));
                } else if (itemValue === 10752) {
                  setBackground(require("../images/war.jpg"));
                } else if (itemValue === 37) {
                  setBackground(require("../images/western.jpg"));
                } else if (itemValue === 16) {
                  setBackground(require("../images/animation.jpg"));
                }
              }}
              style={styles.picker}
              itemStyle={{ color: "red", fontWeight: "bold" }}
            >
              {dropdownOptions.map((option, index) => {
                return (
                  <Picker.Item
                    label={option.label}
                    value={option.number}
                    key={index}
                  />
                );
              })}
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSendGenreAndMovieData}
            >
              <Text style={styles.buttonText}>Get Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleViewMovieCard}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            {dropdown === 28 && (
              <>
                <Text style={styles.title}>Rated R</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={ratedRSwitch ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleRatedR}
                  value={ratedRSwitch}
                />
              </>
            )}
            {/* <Text style={styles.title}>{dropdown}</Text> */}
          </View>
        </ImageBackground>
      )}

      {movieData && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendGenreAndMovieData}
          >
            <Text style={styles.buttonText}>Get Another</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{movieData.original_title}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
              }}
              style={styles.moviePoster}
            />
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCleardropdownAndX}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={addToWatchlist}>
            <Text style={styles.buttonText}>Add To Watchlist</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
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
  picker: {
    width: 400,
    color: "white",
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    // flex: 1,
  },
});

export default MovieCard;
