import { Text, View } from "../../components/Themed";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

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
        <Text>Write a specific title</Text>
        <TextInput
          placeholder={
            "Keep it relevant. If the community flags your post for going off topic it will be invisible to the communtiy."
          }
          placeholderTextColor="#fff"
          multiline={true}
          numberOfLines={3}
          style={styles.textArea}
          value={post}
          onChangeText={setPost}
        />
        <TextInput
          placeholder={
            "Keep it relevant. If the community flags your post for going off topic it will be invisible to the communtiy."
          }
          placeholderTextColor="#fff"
          multiline={true}
          numberOfLines={5}
          style={styles.textArea}
          value={post}
          onChangeText={setPost}
        />
        <Text>Choose a community</Text>
      </View>
      <Link href="/modal" asChild>
        <Pressable style={styles.floatingButton}>
          <AntDesign name="plus" size={24} color="gray" />
          <Text>Create an Offer or Poll</Text>
        </Pressable>
      </Link>
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
    height: "75%",
    width: "100%",
    flexDirection: "column",
  },
  textArea: {
    height: "25%",
    color: "white",
    flex: 1,
    padding: 10,
    textAlignVertical: "top",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    lineHeight: 25,
  },
  floatingButton: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#1B1B1B",
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export default NewPost;
