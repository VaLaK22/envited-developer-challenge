import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { View, Text } from "../../components/Themed";
import { Post, Search, TopTab } from "../../components/feed/common";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { listPosts } from "../../lib/api/posts";
import { useQuery } from "@tanstack/react-query";

const home = () => {
  const [activeTab, setActiveTab] = useState<"home" | "popular">("home");

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", activeTab],
    queryFn: () => listPosts(activeTab),
  });

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          fadeDuration={0}
          style={{ width: 40, height: 40 }}
        />
        <Search />
        <AntDesign name="message1" size={26} color="gray" />
      </View>
      <View style={styles.topTabContainer}>
        <TopTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <Post post={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  navContainer: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  topTabContainer: {
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default home;
