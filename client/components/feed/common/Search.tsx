import { View, Text } from "../../Themed";
import { StyleSheet, TextInput } from "react-native";
const Search = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Search by keyword"}
        placeholderTextColor="gray"
        multiline={true}
        numberOfLines={5}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "65%",
  },
  input: {
    color: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: "#232325",
  },
});

export default Search;
