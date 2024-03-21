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
  Pressable,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import FlipCard from "react-native-flip-card";
import Popup from "./Popup";
import YoutubePlayer from "react-native-youtube-iframe";
import CastDetails from "./CastDetails";

const MovieCard = ({
  movieData,
  movieDataWithId,
  addToWatchlist,
  handleX,
  handleViewMovieCard,
  getMovieData,
  getMovieDataWithId,
  enterGetMovie,
  receiveGenre,
  popupMessage,
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
  const [swipeProcessedUp, setSwipeProcessedUp] = useState(false);
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const [netflix, setNetflix] = useState(false);
  const [movieHasStreaming, setMovieHasStreaming] = useState(false);
  const [trailerId, setTrailerId] = useState();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [cast, setCast] = useState();

  useEffect(() => {
    if (movieData) {
      // console.log(movieData[0]);
      setMovieIndex(Math.floor(Math.random() * movieData.length));
    }
  }, [movieData]);

  useEffect(() => {
    if (movieDataWithId) {
      const tempCast = movieDataWithId.credits.cast.filter(
        (actor) => actor.known_for_department === "Acting"
      );
      setCast(tempCast);
      if (
        movieDataWithId.videos.results.filter(
          (trailer) => trailer.type === "Trailer"
        )[0].key
      ) {
        setTrailerId(
          movieDataWithId.videos.results.filter(
            (trailer) => trailer.type === "Trailer"
          )[0].key
        );
      }

      if (movieDataWithId["watch/providers"].results.US.flatrate) {
        setMovieHasStreaming(true);
      }
    }
  }, [movieDataWithId]);

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
    if (swipeProcessedUp) {
      handleSwipeUp();
      setSwipeProcessedUp(false);
    }
  }, [dropdown, swipeProcessedRight, swipeProcessedLeft, swipeProcessedUp]);

  const toggleRatedR = () => {
    if (ratedRSwitch) {
      setRatedRSwitch(false);
    } else {
      setRatedRSwitch(true);
    }
    console.log("hit", ratedRSwitch);
  };

  const toggleNetflixSwitch = () => {
    console.log("hit toggle netflix");
    setNetflix(!netflix);
  };

  const handleCleardropdownAndX = () => {
    handleX();
    setDropdown("");
  };

  const sendGenre = () => {
    console.log("DROPDOWN", dropdown);
    receiveGenre(dropdown.itemValue, netflix);
  };

  const handleSendGenreAndMovieData = () => {
    sendGenre();
  };

  const handleSwipeRight = () => {
    if (movieIndex >= 1) {
      setMovieIndex(() => movieIndex - 1);
    }
  };

  const handleSwipeLeft = () => {
    if (movieIndex < movieData.length - 1) {
      setMovieIndex(() => movieIndex + 1);
    }
  };

  const handleSwipeUp = () => {
    // console.log(movieData[movieIndex].id);
    getMovieDataWithId(movieData[movieIndex].id);
    setIsFlipped(!isFlipped);
  };

  const handlePopupStatus = () => {
    setPopupStatus(!popupStatus);
  };

  const toggleDescriptionExpansion = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
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
        } else if (gestureState.dy < -50) {
          setSwipeProcessedUp(true);
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleViewMovieCard}
            >
              <Text style={styles.backButtonText}>⇦</Text>
            </TouchableOpacity>
            <View style={styles.questionContainer}>
              <Text style={styles.title}>
                What genre are you in the mood for?
              </Text>

              <Text>Netflix</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={ratedRSwitch ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNetflixSwitch}
                value={netflix}
              />
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
                    key={option.number}
                    color="white"
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
            style={styles.closeButton}
            onPress={handleCleardropdownAndX}
          >
            <Text style={styles.backButtonText}>⇦</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {movieData[movieIndex].original_title}
          </Text>
          <View style={{ flex: 0, height: 525, width: 400, marginBottom: 20 }}>
            <FlipCard
              flip={isFlipped}
              friction={2}
              perspective={1000}
              flipHorizontal={false}
              flipVertical={true}
              {...swipeResponder.panHandlers}
            >
              {/* Face Side */}
              <View style={styles.face}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${movieData[movieIndex].poster_path}`,
                    }}
                    style={styles.moviePoster}
                  />
                </View>
              </View>
              {/* Back Side */}
              {movieDataWithId && (
                <View style={styles.descriptionContainer}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                  >
                    <Pressable onPress={handleSwipeUp}>
                      <TouchableOpacity
                        onPress={toggleDescriptionExpansion}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.movieDescription}>
                          {isDescriptionExpanded
                            ? movieDataWithId.overview
                            : `${movieDataWithId.overview.substring(
                                0,
                                150
                              )}...⇨`}
                        </Text>
                      </TouchableOpacity>
                      {cast && (
                        <View style={styles.actorContainer}>
                          <ScrollView
                            nestedScrollEnabled
                            horizontal
                            showsHorizontalScrollIndicator={false}
                          >
                            {cast.slice(0, 10).map((actor, index) => {
                              return (
                                <View key={`${actor.id}_${index}`}>
                                  <Pressable>
                                    <Image
                                      source={{
                                        uri: `https://image.tmdb.org/t/p/original${actor.profile_path}`,
                                      }}
                                      style={styles.actor}
                                    />
                                  </Pressable>
                                  <Text style={styles.actorName}>
                                    {actor.name}
                                  </Text>
                                </View>
                              );
                            })}
                          </ScrollView>
                        </View>
                      )}
                      <Text style={styles.popularity}>
                        {movieDataWithId.vote_average.toFixed(1)}
                        /10
                      </Text>
                      {movieDataWithId["watch/providers"].results.US
                        .flatrate && (
                        <View style={styles.iconContainer}>
                          <Text style={styles.title}>Streaming on: </Text>
                          <View style={styles.iconRow}>
                            {movieDataWithId[
                              "watch/providers"
                            ].results.US.flatrate.map((streaming, index) => {
                              return (
                                <Image
                                  source={{
                                    uri: `https://image.tmdb.org/t/p/original${streaming.logo_path}`,
                                  }}
                                  style={styles.icon}
                                  key={`${streaming.logo_path}_${index}`}
                                />
                              );
                            })}
                          </View>
                        </View>
                      )}

                      {!movieDataWithId["watch/providers"].results.US
                        .flatrate && (
                        <Text style={styles.title}>
                          Not Currently Streaming
                        </Text>
                      )}

                      <View style={styles.youtubeContainer}>
                        <YoutubePlayer
                          height={300}
                          videoId={trailerId}
                          // webViewStyle={{ borderRadius: 20 }}
                        />
                      </View>
                    </Pressable>
                  </ScrollView>
                </View>
              )}
            </FlipCard>
          </View>

          {popupStatus && (
            <Popup
              popupMessage={popupMessage}
              handlePopupStatus={handlePopupStatus}
            />
          )}
        </View>
      )}
      <View style={styles.anotherAndAddToWatchContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSendGenreAndMovieData}
        >
          <Text style={styles.buttonText}>Get Another</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToWatchlist(movieIndex);
            handlePopupStatus();
          }}
        >
          <Text style={styles.buttonText}>Add To Watchlist</Text>
        </TouchableOpacity>
      </View>
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
  descriptionContainer: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: 400,
    height: 600,
  },
  questionContainer: {
    position: "absolute",
    top: 70,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
  iconContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  youtubeContainer: {
    borderRadius: 20,
    overflow: "hidden",
    aspectRatio: 16 / 9,
    width: "100%",
  },
  anotherAndAddToWatchContainer: {
    marginBottom: 50,
  },
  actorContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    flexGrow: 0,
    width: 400,
    height: 140,
    justifyContent: "center",
  },
  actor: {
    width: 75,
    height: 112.5,
    marginRight: 10,
    borderRadius: 10,
  },
  actorName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    width: 75,
    textAlign: "center",
    color: "#009572",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icon: {
    width: 75,
    height: 75,
    borderRadius: 15,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#009572",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    // paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 10,
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
  backButtonText: {
    color: "#009572",
    fontSize: 35,
    fontWeight: "bold",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#009572",
  },
  popularity: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
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
  movieDescription: {
    fontSize: 35,
    lineHeight: 40,
    textAlign: "justify",
    color: "#009572",
  },
  imageContainer: {
    shadowColor: "#009572",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  moviePoster: {
    width: 400,
    height: 600,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 40,
    left: 20,
  },
  goBackButton: {
    backgroundColor: "black",
    position: "absolute",
    top: 30,
    left: 20,
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
