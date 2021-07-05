import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import placeholder from "./assets/coffee.png";

const MarkerCallout = props => {
    const { title, cat, url } = props;

    return (
        <View style={styles.calloutContainer}>
            <Text style={styles.calloutImgContainer}>
                <Image defaultSource={placeholder} source={placeholder} style={styles.calloutImg} />
            </Text>
            <Text style={styles.calloutTitle}>
                {title}
            </Text>
            <Text style={styles.calloutTxt}>
                {cat}
            </Text>
            <Button title="Visit" onPress={() => Alert.alert('Pending feature')}/>
        </View>
    )
};

const styles = StyleSheet.create({
    calloutContainer: {
      width: 300,
      height: 200,
      backgroundColor: '#F4F4F4',
      paddingVertical: 16,
      paddingHorizontal: 8,
    },
    calloutTitle: {
      fontSize: 13,
      color: "#333333",
    },
    calloutTxt: {
      fontSize: 10,
      color: "#999999",
    },
    calloutImgContainer: {
        width: "100%",
        height: 150,
        marginTop: -80,
        marginBottom: 40,
    },
    calloutImg: {
        width: 300,
        height: 150,
    }
  });

export default MarkerCallout