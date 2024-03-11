import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Switch,
  Dimensions,
  PanResponder,
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
  const [dropdown, setDropdown] = useState({
    itemValue: "",
    index: null,
    genre: "",
  });
  const [swipeProcessedRight, setSwipeProcessedRight] = useState(false);
  const [swipeProcessedLeft, setSwipeProcessedLeft] = useState(false);
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

  const [movieIndex, setMovieIndex] = useState(0);

  useEffect(() => {
    if (swipeProcessedRight) {
      // sendGenre();
      handleSwipeRight();
      setSwipeProcessedRight(false);
    }
    if (swipeProcessedLeft) {
      // addToWatchlist();
      handleSwipeLeft();
      setSwipeProcessedLeft(false);
    }
  }, [dropdown, swipeProcessedRight, swipeProcessedLeft]);

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
    console.log("DROPDOWN", dropdown);
    receiveGenre(dropdown.itemValue, ratedRSwitch);
  };

  const handleSendGenreAndMovieData = () => {
    sendGenre();
  };

  const handleSwipeRight = () => {
    if (movieIndex < movieData.length - 1) {
      setMovieIndex(() => movieIndex + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (movieIndex >= 1) {
      setMovieIndex(() => movieIndex - 1);
    }
  };

  const swipeResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderEnd: (event, gestureState) => {
        if (gestureState.dx > 50) {
          console.log("right");
          setSwipeProcessedRight(true);
        } else if (gestureState.dx < -50) {
          console.log("left");
          setSwipeProcessedLeft(true);
          // addToWatchlist();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {enterGetMovie && !movieData && (
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imgBackground}
        >
          <View style={styles.container}>
            <View style={styles.questionContainer}>
              <Text style={styles.title}>
                What genre are you in the mood for?
              </Text>
            </View>

            <Text style={styles.genreTitle}>{dropdown.genre}</Text>
            <Picker
              selectedValue={dropdown.itemValue}
              onValueChange={(itemValue, itemIndex) => {
                const selectedGenre = dropdownOptions.find(
                  (option) => option.number === itemValue
                );
                setDropdown({
                  itemValue,
                  index: itemIndex,
                  genre: selectedGenre?.label,
                });
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
              itemStyle={styles.pickerItem}
              dropdownIconColor={"#009572"}
            >
              {dropdownOptions.map((option, index) => {
                return (
                  <Picker.Item
                    label={option.label}
                    value={option.number}
                    key={index}
                    color="black"
                  />
                );
              })}
            </Picker>
            <View style={styles.buttonContainer}>
              {dropdown.genre && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSendGenreAndMovieData}
                >
                  <Text style={styles.buttonText}>Get Movie</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={handleViewMovieCard}
              >
                <Text style={styles.buttonText}>Go Back</Text>
              </TouchableOpacity>
            </View>

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
          <Text style={styles.title}>
            {movieData[movieIndex].original_title}
          </Text>
          <View style={styles.imageContainer} {...swipeResponder.panHandlers}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movieData[movieIndex].poster_path}`,
              }}
              style={styles.moviePoster}
            />
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCleardropdownAndX}
          >
            <Text style={styles.closeButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addToWatchlist(movieIndex)}
          >
            <Text style={styles.buttonText}>Add To Watchlist</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "relative",
  },
  questionContainer: {
    position: "absolute",
    top: 50,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
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
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#009572",
  },
  genreTitle: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#10495C",
    marginBottom: 10,
    position: "absolute",
    top: 175,
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
    borderRadius: 10,
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
    width: (screenWidth * buttonWidthPercentage) / 100,
    color: "white",
    backgroundColor: "#009572",
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderColor: "#fff",
    borderWidth: 1,
  },
  pickerItem: {
    color: "#009572",
    fontSize: 18,
  },
  imgBackground: {
    width: "100%",
    height: "100%",
  },
});

export default MovieCard;
