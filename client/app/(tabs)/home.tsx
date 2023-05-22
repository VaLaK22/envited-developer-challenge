import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { View } from "../../components/Themed";
import posts from "../../assets/data/posts";
import { Post, Search, TopTab } from "../../components/feed/common";
import { AntDesign } from "@expo/vector-icons";

export default function TabOneScreen() {
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
        <TopTab />
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

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
