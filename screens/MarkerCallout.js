import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import placeholder from "../assets/coffee.png";

const MarkerCallout = props => {
    const { name, imageUrl } = props;

    return (
        <View style={styles.calloutContainer}>
            <Text style={styles.calloutImgContainer}>
                <Image
                    defaultSource={placeholder}
                    source={{uri: imageUrl ? imageUrl : null}}
                    style={styles.calloutImg}
                    resizeMethod="scale"
                    resizeMode="center"
                    />
            </Text>
            <Text style={styles.calloutTitle}>
                {name}
            </Text>
            <Button style={{width: "100%", color: "#666"}} icon="directions" mode="outlined">Visit</Button>
        </View>
    )
};

const styles = StyleSheet.create({
    calloutContainer: {
      width: 150,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      overflow: "hidden",
      backgroundColor: '#F4F4F4',
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    calloutTitle: {
      fontSize: 13,
      color: "#333333",
      flexBasis: "100%",
      marginBottom: 8,
    },
    calloutTxt: {
      fontSize: 10,
      color: "#999999",
      flexBasis: "100%",
    },
    calloutImgContainer: {
        marginTop: 0,
        marginBottom: 8,
        padding: 0,
        alignSelf: "flex-start",
        height: 150,
    },
    calloutImg: {
        width: 150,
        height: 150,
        resizeMode: "cover",
    }
  });

export default MarkerCallout
