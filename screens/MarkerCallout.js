import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import placeholder from "./assets/coffee.png";

const MarkerCallout = props => {
    const { title, cat, url } = props;

    return (
        <View style={styles.calloutContainer}>
            <Text style={styles.calloutImgContainer}>
                <Image 
                    defaultSource={placeholder}
                    source={placeholder}
                    style={styles.calloutImg} 
                    resizeMethod="scale"
                    resizeMode="center"
                    />
            </Text>
            <Text style={styles.calloutTxt}>
                {cat}
            </Text>
            <Text style={styles.calloutTitle}>
                {title}
            </Text>
            <Button title="Visit"/>
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