import {
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { View, Text } from "../../components/Themed";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../lib/api/auth";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

const SignIn = () => {
  const router = useRouter();

  const {
    mutateAsync,
    isError,
    isPending,
    error: signInError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push({ pathname: "/authenticate", params: { email } });
    },
  });
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (text: string) => {
    if (!isValidEmail(text)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
    setEmail(text);
  };

  const onSignin = async () => {
    await mutateAsync({ email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sign in or create an accoutn</Text>
      {isError ? <Text style={styles.error}>{signInError.message}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={handleChange}
      />

      <Pressable style={styles.button} onPress={onSignin}>
        <Text style={styles.button}>Sign in</Text>
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

export default SignIn;
