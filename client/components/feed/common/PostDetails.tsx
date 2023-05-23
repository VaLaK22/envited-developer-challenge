import { StyleSheet, Image, Pressable, SafeAreaView } from "react-native";
import { View, Text } from "../../../components/Themed";
import posts from "../../../assets/data/posts";
import { Post as PostType } from "../../../types";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
interface PostProps {
  post: PostType;
}

const PostDetails = ({ post }: PostProps) => {
  return (
    <SafeAreaView
      style={{
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "darkgrey",
      }}
    >
      <Link href={`/post/${post.id}`} asChild>
        <Pressable style={styles.container}>
          <Image
            source={require("../../../assets/images/jeff.jpeg")}
            fadeDuration={0}
            style={styles.userImage}
          />
          <View style={styles.mainContainer}>
            <View style={styles.postHeaderContainer}>
              <Text style={styles.name}>{post?.user?.name}</Text>
              <Text style={styles.time}>2h</Text>
            </View>
            <View style={styles.postHeaderContainer}>
              <Text style={styles.userName}>
                {post?.user?.username} · {post?.user?.username}
              </Text>
            </View>
            <Text style={styles.content}>{post.content}</Text>
          </View>
        </Pressable>
      </Link>
      {post?.image ? (
        <Image
          source={require("../../../assets/images/jeff.jpeg")}
          style={styles.image}
        />
      ) : null}
      {post?.poll ? (
        <View style={styles.pollMainContainer}>
          <View style={styles.pollContainer}>
            <FontAwesome5 name="poll" size={24} color="#BF6A63" />
            <Text style={styles.pollQuestion}>Poll</Text>
            <Text style={styles.pollParticipants}>
              {post?.poll.participants} Participants
            </Text>
          </View>
        </View>
      ) : null}

      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="heart-o" size={24} color="grey" />
          <Text style={styles.statsLabel}>{post.likes}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="comment-o" size={24} color="grey" />
          <Text style={styles.statsLabel}>{post.coutnt?.comments || 0}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="eye-outline" size={24} color="grey" />
          <Text style={styles.statsLabel}>{post.views}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetails;

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
  pollMainContainer: {
    marginVertical: 10,
    marginHorizontal: 25,
  },

  pollContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#262628",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262628",
    marginBottom: 5,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#BF6A63",
    paddingHorizontal: 5,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: "grey",
  },
  pollParticipants: {
    fontSize: 16,
    fontWeight: "400",
    color: "#E7E7E8",
    paddingLeft: 10,
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
