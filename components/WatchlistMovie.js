import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import FlipCard from "react-native-flip-card";
import Popup from "./Popup";

const WatchlistMovie = ({
  movie,
  deleteFromWatchlist,
  popupMessage,
  handlePopupStatus,
}) => {
  const [movieOverviewStatus, setMovieOverviewStatus] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);

  const handleMovieOverviewStatus = () => {
    setMovieOverviewStatus(!movieOverviewStatus);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View style={styles.container}>
      <FlipCard
        flip={isFlipped}
        friction={2}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
      >
        {/* Front Side */}
        <View style={styles.face}>
          {/* Wrap the image in a View */}
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
              }}
              style={styles.moviePoster}
            />
          </View>
        </View>
        {/* Back Side */}
        <View style={styles.back}>
          <View style={styles.descriptionContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Pressable>
                <Text
                  style={styles.movieDescription}
                  onPress={handleFlip}
                  suppressHighlighting={true}
                >
                  {movie.overview}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </FlipCard>

      <Text style={styles.title} onPress={handleMovieOverviewStatus}>
        {movie.original_title}
      </Text>
      {/* <TouchableHighlight onPress={handleMovieOverviewStatus}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          }}
          style={styles.moviePoster}
        />
      </TouchableHighlight> */}

      {/* {movieOverviewStatus && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.movieDescription}>{movie.overview}</Text>
        </View>
      )} */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deleteFromWatchlist(movie);
          handlePopupStatus();
        }}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 80;

const posterWidthPercentage = 60; // Adjust as needed
const posterWidth = (screenWidth * posterWidthPercentage) / 100;
const posterAspectRatio = 2 / 3;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // width: "50%",
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
  descriptionContainer: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: 200,
    height: 300,
  },
  movieDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#009572",
  },
  moviePoster: {
    // width: posterWidth,
    // height: posterWidth * posterAspectRatio,
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10,
  },
  scrollView: {},
});

export default WatchlistMovie;
