import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";

const Watchlist = () => {
  const [movieData, setMovieData] = useState();
  const [watchlist, setWatchlist] = useState();

  //add to watchlist
  //   const addToWatchlist = () => {
  //     if (movieData) {
  //       const auth = getAuth();
  //       const user = auth.currentUser.uid;
  //       const db = getDatabase();
  //       const userRef = ref(db, `users/${user}/watchlist`);

  //       // Read the existing watchlist
  //       onValue(userRef, (snapshot) => {
  //         const data = snapshot.val() || [];
  //         if (!data.includes(movieData.original_title)) {
  //           data.push(movieData.original_title);
  //           set(userRef, data)
  //             .then(() => {
  //               console.log(
  //                 `Added ${movieData.original_title} to the watchlist.`
  //               );
  //             })
  //             .catch((error) => {
  //               console.error(`Error adding movie to watchlist: ${error}`);
  //             });
  //         } else {
  //           console.log(
  //             `${movieData.original_title} is already in the watchlist.`
  //           );
  //         }
  //       });
  //     }
  //   };

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
  return (
    <View style={styles.container}>
      {watchlist.map((movie) => {
        return <Text style={styles.title}>{movie}</Text>;
      })}
      <TouchableOpacity style={styles.button} onPress={handleWatchBack}>
        <Text style={styles.buttonText}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Watchlist;

const styles = StyleSheet.create({});
