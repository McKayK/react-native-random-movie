import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";

const CastDetails = ({ cast }) => {
  const [smallCast, setSmallCast] = useState([]);

  useEffect(() => {
    if (cast) {
      setSmallCast(cast.slice(0, 10));
    }
  }, []);

  useEffect(() => {
    console.log("small cast", smallCast);
  }, [smallCast]);
  return (
    <View>
      <ScrollView>
        {smallCast && (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${smallCast[0].profile_path}`,
            }}
            style={styles.actor}
            //   key={`${actor.id}_${index}`}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CastDetails;

const styles = StyleSheet.create({
  actor: {
    width: 75,
    height: 112.5,
    marginRight: 10,
    borderRadius: 10,
  },
});
