import { StyleSheet, Image, Pressable, SafeAreaView } from "react-native";
import { View, Text } from "../../../components/Themed";
import { Post as PostType } from "../../../types";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { likePost, viewPost } from "../../../lib/api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Poll from "./Poll";
interface PostProps {
  post: PostType;
}

const PostDetails = ({ post }: PostProps) => {
  const queryClient = useQueryClient();

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
    mutationFn: viewPost,
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
      {post?.poll ? <Poll poll={post.poll} /> : null}
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
