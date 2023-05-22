import { Text, View } from "../../components/Themed";
import { StyleSheet, TextInput, SafeAreaView, Pressable } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const user = {
  id: "u1",
  username: "sahil",
  name: "Sahil Kumar",
  image: "https://i.imgur.com/3tjWJ3c.jpeg",
};

const NewPost = () => {
  const [post, setPost] = useState("");
  const router = useRouter();
  const onPost = () => {
    console.warn(`Posting: ${post}`);
    setPost("");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navContainer}>
        <Link href="/" asChild>
          <Pressable>{({ pressed }) => <Text>Cancel</Text>}</Pressable>
        </Link>

        <Pressable onPress={onPost}>
          {({ pressed }) => <Text>Post</Text>}
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            "Write a specific title \n\nKeep it relevant. If the community flags your post for going off topic it will be invisible to the communtiy. \n\n\n@  Tag Company / Job Title"
          }
          placeholderTextColor="#fff"
          multiline={true}
          numberOfLines={10}
          style={styles.input}
          value={post}
          onChangeText={setPost}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  navContainer: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
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
