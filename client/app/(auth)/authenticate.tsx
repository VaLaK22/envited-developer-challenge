import {
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { View, Text } from "../../components/Themed";
import React, { useState, useContext } from "react";
import { useSearchParams, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "../../lib/api/auth";
import AuthContext from "../../store/auth-context";

const Authenticate = () => {
  const { updateAuthToken } = useContext(AuthContext);

  const router = useRouter();
  const { email } = useSearchParams();
  const [code, setCode] = useState("");

  const {
    mutate,
    isError,
    isPending,
    error: error,
  } = useMutation({
    mutationFn: authenticate,
    onSuccess: async (res) => {
      const { authToken } = res;
      // await SecureStore.setItemAsync("token", authToken);
      updateAuthToken(authToken);
      router.push({ pathname: "/home" });
    },
  });

  const onConfirm = () => {
    if (typeof email !== "string") {
      throw new Error("Email is not a string");
    }
    mutate({ email, emailToken: code });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the 8-digit code from your email</Text>
      {isError ? <Text style={styles.error}>{error.message}</Text> : null}

      <TextInput
        placeholder="Code"
        style={styles.input}
        placeholderTextColor="white"
        value={code}
        onChangeText={setCode}
      />

      <Pressable style={styles.button} onPress={onConfirm}>
        <Text style={styles.button}>Confirm</Text>
      </Pressable>
      {isPending ? <ActivityIndicator /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  input: {
    borderColor: "lightgrey",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginVertical: 10,
    width: "90%",
    color: "white",
  },
  button: {
    backgroundColor: "#e33062",
    alignItems: "center",
    borderRadius: 5,
    textAlign: "center",
    marginVertical: 10,
    width: "45%",
  },
  buttonText: {
    color: "white",
  },
});

export default Authenticate;
