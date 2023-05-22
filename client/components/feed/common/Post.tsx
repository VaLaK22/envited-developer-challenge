import { StyleSheet, Image } from "react-native";
import { View, Text } from "../../../components/Themed";
import posts from "../../../assets/data/posts";
import { Post as PostType } from "../../../types";

const tweet = posts[0];

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <View style={styles.container}>
      <Image src={post.user.image} style={styles.userImage} />
      <View style={styles.mainContainer}>
        <Text style={styles.name}>{post.user.name}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "darkgrey",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 5,
    flex: 1,
  },
  name: {
    fontWeight: "600",
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
});
