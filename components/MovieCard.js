import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
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
  const [dropdown, setDropdown] = useState("");
  const dropdownOptions = [
    { label: "Action", number: 28 },
    { label: "Comedy", number: 35 },
    { label: "Adventure", number: 12 },
    { label: "Drama", number: 18 },
    { label: "Fantasy", number: 14 },
    { label: "Sci-Fi", number: 878 },
    { label: "Thriller", number: 53 },
  ];

  const handleCleardropdownAndX = () => {
    handleX();
    setDropdown("");
  };

  const sendGenre = () => {
    receiveGenre(dropdown);
    // getMovieData();
  };

  const handleSendGenreAndMovieData = () => {
    sendGenre();
  };
  return (
    <View style={styles.container}>
      {enterGetMovie && !movieData && (
        <View style={styles.container}>
          <Picker
            selectedValue={dropdown}
            onValueChange={(itemValue, itemIndex) => setDropdown(itemValue)}
            style={styles.picker}
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
          <TouchableOpacity style={styles.button} onPress={handleViewMovieCard}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{dropdown}</Text>
        </View>
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
  },
});

export default MovieCard;
