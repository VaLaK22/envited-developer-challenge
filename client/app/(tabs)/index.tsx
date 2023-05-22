import { StyleSheet, FlatList } from "react-native";
import { View } from "../../components/Themed";
import Post from "../../components/feed/common/Post";
import posts from "../../assets/data/posts";
export default function TabOneScreen() {
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
