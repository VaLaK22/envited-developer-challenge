import { StyleSheet, Image, Pressable } from "react-native";
import { View, Text } from "../../../components/Themed";
import posts from "../../../assets/data/posts";
import { Post as PostType } from "../../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <View
      style={{
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "darkgrey",
      }}
    >
      <Link href={`/post/${post.id}`} asChild>
        <Pressable style={styles.container}>
          <Image src={post.user.image} style={styles.userImage} />
          <View style={styles.mainContainer}>
            <View style={styles.postHeaderContainer}>
              <Text style={styles.name}>{post.user.name}</Text>
              <Text style={styles.time}>2h</Text>
            </View>
            <View style={styles.postHeaderContainer}>
              <Text style={styles.userName}>
                {post.user.username} · {post.user.username}
              </Text>
            </View>
            <Text style={styles.content}>{post.content}</Text>
            {post.image ? (
              <Image src={post.image} style={styles.image} />
            ) : null}
          </View>
        </Pressable>
      </Link>

      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="heart-o" size={24} color="grey" />
          <Text style={styles.statsLabel}>{post.numberOfLikes}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="comment-o" size={24} color="grey" />
          <Text style={styles.statsLabel}>{post.numberOfComments}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="eye-outline" size={24} color="grey" />
          <Text style={styles.statsLabel}>{post.impressions || 0}</Text>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  mainContainer: {
    marginLeft: 5,
    flex: 1,
  },
  postHeaderContainer: {
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
  },
  time: {
    marginLeft: 8,
    color: "grey",
    fontSize: 16,
    fontWeight: "400",
  },
  userName: {
    color: "grey",
    fontSize: 16,
    fontWeight: "400",
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 15,
    marginVertical: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsLabel: {
    color: "grey",
    marginLeft: 5,
  },
});
