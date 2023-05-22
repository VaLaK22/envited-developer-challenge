import { Text } from "../../components/Themed";
import Post from "../../components/feed/common/Post";
import posts from "../../assets/data/posts";
import { useSearchParams } from "expo-router";
const post = () => {
  const { id } = useSearchParams();

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <Text>Post not found</Text>;
  }

  return <Post post={post} />;
};

export default post;
