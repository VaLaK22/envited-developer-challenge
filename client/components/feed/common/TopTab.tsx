import { View, Text } from "../../Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";

interface TopTabProps {
  activeTab: "home" | "popular";
  setActiveTab: (activeTab: "home" | "popular") => void;
}

const TopTab = ({ activeTab, setActiveTab }: TopTabProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.notActive} disabled={true}>
        JOBS
      </Text>
      <Text
        style={activeTab === "home" ? styles.active : styles.notActive}
        onPress={() => setActiveTab("home")}
      >
        HOME
      </Text>
      <Text
        style={activeTab === "popular" ? styles.active : styles.notActive}
        onPress={() => setActiveTab("popular")}
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
