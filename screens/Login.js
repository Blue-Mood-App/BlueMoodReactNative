import React from "react";
import { useDispatch } from "react-redux";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { FormBuilder } from "react-native-paper-form-builder";
import { useForm } from 'react-hook-form';
import { authenticateLogin } from "../store/auth";

export default function Login({ navigation }) {
  const { control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <Text style={styles.text}>Sign in</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'email',
              name: 'email',

              rules: {
                required: {
                  value: true,
                  message: 'Email is required',
                },
              },
              textInputProps: {
                label: 'Email',
                left: <TextInput.Icon name={'email'} />,
              },
            },
            {
              type: 'password',
              name: 'password',

              rules: {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              },
              textInputProps: {
                label: 'Password',
                left: <TextInput.Icon name={'lock'} />,
              },
            },
          ]}
        />
        <Button
          mode = {"contained"}
          onPress={handleSubmit(data => {
            const { email, password } = data;
            dispatch(authenticateLogin(email, password));
            navigation.navigate("Home");
          })}
          style={styles.btn}
        >Login</Button>
        <Text style={styles.txtFirst}>First Time?</Text>
        <Text style={styles.txtRegister} onPress={() => navigation.navigate("Register")}>Register</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  text: {
    fontSize: 38,
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "700",
  },
  txtFirst: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
  },
  txtRegister: {
    fontSize: 13,
    textAlign: "center",
    color: "#3369ea"
  },
  btn: {
    marginVertical: 8,
  },
});
