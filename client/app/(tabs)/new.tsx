import { Text, View } from "../../components/Themed";
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useContext, useState } from "react";
import { Link, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../lib/api/posts";
import { Post as postType } from "../../types";
import MyContext from "../../store/poll-context";

const user = {
  id: "u1",
  username: "sahil",
  name: "Sahil Kumar",
  image: "https://i.imgur.com/3tjWJ3c.jpeg",
};

const NewPost = () => {
  const [post, setPost] = useState<postType>();
  const { isChecked, fields, rest } = useContext(MyContext);

  const router = useRouter();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: createPost,
  });
  const onPost = () => {
    let options: any = [];
    if (fields && fields.length > 0) {
      options = fields.map((field) => {
        return {
          option: field,
        };
      });
    }

    mutate({
      content: post?.content || "",
      tag: post?.tag || "",
      poll: {
        question: post?.poll?.question || "",
        options: options || [],
        allowMultiple: isChecked,
      },
    });
    router.back();
  };

  if (isError) {
    console.log(error, "errorrewrwerwerewr");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navContainer}>
        <Link href="/" asChild>
          <Pressable>{({ pressed }) => <Text>Cancel</Text>}</Pressable>
        </Link>

        {isPending ? <ActivityIndicator size="small" color="white" /> : null}

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
          value={post?.content}
          onChangeText={(text) => setPost({ ...post, content: text })}
        />
        <TextInput
          placeholder={"@ Tag Company / Job Title"}
          placeholderTextColor="#fff"
          value={post?.tag}
          onChangeText={(text) => setPost({ ...post, tag: text })}
          style={styles.input}
        />

        <View>{fields.length > 0 ? <Text>Poll Added</Text> : null}</View>
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
    padding: 10,
    textAlignVertical: "top",
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    lineHeight: 25,
  },
  input: {
    paddingTop: 10,
    color: "white",
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
