import { View, Text } from "../../Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";

const TopTab = () => {
  const [activeTab, setActiveTab] = useState("Jobs");
  return (
    <View style={styles.container}>
      <Text
        style={activeTab === "Jobs" ? styles.active : styles.notActive}
        onPress={() => setActiveTab("Jobs")}
      >
        JOBS
      </Text>
      <Text
        style={activeTab === "Home" ? styles.active : styles.notActive}
        onPress={() => setActiveTab("Home")}
      >
        HOME
      </Text>
      <Text
        style={activeTab === "Popular" ? styles.active : styles.notActive}
        onPress={() => setActiveTab("Popular")}
      >
        POPULAR
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    color: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: "#232325",
  },
  active: {
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingBottom: 10,
    flex: 1,
    textAlign: "center",
  },
  notActive: {
    color: "gray",
    flex: 1,
    textAlign: "center",
  },
});
export default TopTab;
