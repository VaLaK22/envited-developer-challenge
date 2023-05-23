import React, { useContext, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import InputFields from "../components/InputFields";
import Checkbox from "expo-checkbox";
import { View, Text } from "../components/Themed";
import MyContext from "../store/poll-context";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const ModalScreen = () => {
  const router = useRouter();
  const { isChecked, fields, setChecked, setFields, rest } =
    useContext(MyContext);
  const onAttach = () => {
    router.back();
  };
  const onBack = () => {
    rest();
    router.back();
  };
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <Pressable onPress={onBack}>
          {({ pressed }) => (
            <FontAwesome name="remove" size={24} color="gray" />
          )}
        </Pressable>

        <Pressable onPress={onAttach}>
          {({ pressed }) => <Text>Attach</Text>}
        </Pressable>
      </View>
      <InputFields
        initialFieldsCount={4}
        fields={fields}
        setFields={setFields}
      />
      <View style={styles.section}>
        <Text style={styles.paragraph}>Allow multiple selections</Text>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
        />
      </View>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  navContainer: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  section: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
