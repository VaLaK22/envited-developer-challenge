import { StyleSheet, Image, Pressable, SafeAreaView } from "react-native";
import { View, Text } from "../../../components/Themed";
import { Post as PostType } from "../../../types";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { likePost, viewPost } from "../../../lib/api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
interface PostProps {
  post: PostType;
}

const PostDetails = ({ post }: PostProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("post", post);
  }, []);

  const {
    mutate: mutateLikes,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
  const {
    mutate: mutateView,
    isError: isErrorView,
    isPending: isPendingView,
    error: viewError,
  } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const onLike = async () => {
    if (!post.id) return;
    mutateLikes(post.id);
  };

  useEffect(() => {
    if (!post.id) return;
    mutateView(post.id);
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "darkgrey",
      }}
    >
      <View style={styles.container}>
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
          {post?.image ? (
            <Image
              source={require("../../../assets/images/jeff.jpeg")}
              style={styles.image}
            />
          ) : null}
        </View>
      </View>
      {post?.poll ? (
        <View style={styles.pollMainContainer}>
          <View style={styles.pollContainer}>
            <FontAwesome5 name="poll" size={24} color="#BF6A63" />
            <Text style={styles.pollQuestion}>Poll</Text>
            <Text style={styles.pollParticipants}>
              {post?.poll.participants} Participants
            </Text>
          </View>
          {post?.poll?.allowMultiple ? (
            <Text style={styles.pollAllowMultiple}>Select answer</Text>
          ) : (
            <Text>Select only one answer</Text>
          )}
          <View>
            <Text>
              {post?.poll?.options
                ? post?.poll?.options[0]?.option
                : "not found"}{" "}
              length
            </Text>
            {post?.poll?.options?.map((option, index) => (
              <View style={styles.pollOptionContainer} key={index}>
                <Text style={styles.pollOptionText}>{option.option}</Text>
                <Text style={styles.pollOptionVotes}>{option.votes} Votes</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
      <View style={styles.iconsContainer}>
        <Pressable style={styles.iconContainer} onPress={onLike}>
          <FontAwesome name="heart-o" size={24} color="grey" />
          <Text style={styles.statsLabel}>{post.likes}</Text>
        </Pressable>
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
    height: 200,
    borderRadius: 15,
    marginVertical: 10,
    resizeMode: "cover",
  },
  pollMainContainer: {
    marginVertical: 10,
    marginHorizontal: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#262628",
    borderRadius: 10,
    padding: 10,
    width: "100%",
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
  pollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pollAllowMultiple: {
    color: "#E7E7E8",
    fontSize: 16,
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
  pollOptionsContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flex: 1,
  },
  pollOptionContainer: {
    flexDirection: "column",
  },
  pollOptionText: {
    color: "#E7E7E8",
    fontSize: 16,
    fontWeight: "400",
  },
  pollOptionVotes: {
    color: "#E7E7E8",
    fontSize: 16,
    fontWeight: "400",
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
