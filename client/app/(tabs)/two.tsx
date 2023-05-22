import { Text, View } from "../../components/Themed";
import { StyleSheet, TextInput } from "react-native";

const user = {
  id: "u1",
  username: "sahil",
  name: "Sahil Kumar",
  image: "https://i.imgur.com/3tjWJ3c.jpeg",
};

const NewPost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            "Write a specific title \n\nKeep it relevant. If the community flags your post for going off topic it will be invisible to the communtiy. \n\n\n@  Tag Company / Job Title"
          }
          placeholderTextColor="#fff"
          multiline={true}
          numberOfLines={10}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    height: "70%",
    width: "100%",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    color: "white",
    padding: 10,
    textAlignVertical: "top",
  },
});

export default NewPost;
