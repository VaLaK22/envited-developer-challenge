import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Pressable } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { View, Text } from "../components/Themed";

interface InputFieldsProps {
  initialFieldsCount?: number;
  fields: string[];
  setFields: any;
}

const InputFields: React.FC<InputFieldsProps> = ({
  initialFieldsCount = 4,
  fields,
  setFields,
}) => {
  useEffect(() => {
    setFields(Array(initialFieldsCount).fill(""));
  }, [initialFieldsCount]);

  const addField = () => {
    setFields([...fields, ""]);
  };

  const deleteField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const updateField = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  return (
    <View style={styles.container}>
      {fields.map((field, index) => (
        <View style={styles.fieldContainer} key={index}>
          <TextInput
            style={styles.input}
            value={field}
            onChangeText={(value) => updateField(index, value)}
            placeholder="Answer Choice"
            placeholderTextColor={"gray"}
          />
          <Pressable onPress={() => deleteField(index)}>
            <FontAwesome name="remove" size={24} color="gray" />
          </Pressable>
        </View>
      ))}
      <Pressable style={styles.add} onPress={addField}>
        <Entypo name="plus" size={24} color="gray" />
        <Text>Add Answer Choice</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderColor: "#ccc",
    color: "white",
    borderRadius: 4,
    paddingHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  add: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#262628",
    marginVertical: 15,
    borderRadius: 5,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default InputFields;
