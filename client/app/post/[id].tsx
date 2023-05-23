import { Text } from "../../components/Themed";
import PostDetails from "../../components/feed/common/PostDetails";
import { useSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../lib/api/posts";
import { ActivityIndicator } from "react-native";
const post = () => {
  const { id } = useSearchParams();

  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id as string),
  });

  if (error) {
    return <Text>Post not found</Text>;
  }
  if (isLoading) return <ActivityIndicator />;

  return <PostDetails post={post} />;
};

export default post;
