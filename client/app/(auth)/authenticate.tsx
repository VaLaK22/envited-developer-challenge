import { TextInput, Pressable, StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "../../lib/api/auth";

const Authenticate = () => {
  const router = useRouter();
  const { email } = useSearchParams();
  const [code, setCode] = useState("");

  const {
    mutateAsync,
    isError,
    isPending,
    error: error,
  } = useMutation({
    mutationFn: authenticate,
    onSuccess: () => {
      router.push({ pathname: "/index" });
    },
  });

  const onConfirm = async () => {
    if (typeof email !== "string") {
      throw new Error("Email is not a string");
    }
    console.warn("Confirming with", code, email);
    await mutateAsync({ email, emailToken: code });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the 8-digit code from your email</Text>

      <TextInput
        placeholder="Code"
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />

      <Pressable style={styles.button} onPress={onConfirm}>
        <Text style={styles.button}>Confirm</Text>
      </Pressable>
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
