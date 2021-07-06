import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {

    const dispatch = useDispatch();

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        if (password === confirmPassword) {
            console.log("firstName => ", firstName, "lastName => ", lastName, "email => ", email, "password => ", password, "confirm password => ", confirmPassword);
            //dispatch(thunkForRegister(firstName, lastName, email, password, confirmPassword))
        } else {
            alert("Password doesn't match");
        };
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <View>

                <TextInput placeholder = "First Name" onChangeText={(evt) => setfirstName(evt)}></TextInput>
                <TextInput placeholder = "Last Name" onChangeText={(evt) => setlastName(evt)}></TextInput>
                <TextInput placeholder = "Email" onChangeText={(evt) => setEmail(evt)}></TextInput>
                <TextInput placeholder = "Password" onChangeText={(evt) => setPassword(evt)}></TextInput>
                <TextInput placeholder = "Confirm Password" onChangeText={(evt) => setConfirmPassword(evt)}></TextInput>

                <Button
                    title="Next"
                    onPress={() => handleSubmit()}
                    style={styles.btn}
                ></Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 23,
      marginHorizontal: 13,
      marginBottom: 30,
    },
    btn: {
        marginVertical: 8,
    },
  });
  