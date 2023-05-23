import {
  Ionicons,
  AntDesign,
  FontAwesome,
  Entypo,
  Foundation,
  Octicons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          height: 53,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="company"
        options={{
          headerShown: false,
          title: "Company",
          tabBarIcon: ({ color }) => (
            <Octicons name="organization" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          headerShown: false,
          title: "",
          tabBarIconStyle: {
            marginTop: 10,
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" color="#E97171" size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          title: "Notifications",
          tabBarIconStyle: {
            marginTop: 10,
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerShown: false,
          title: "More",
          tabBarIconStyle: {
            marginTop: 10,
          },
          tabBarIcon: ({ color }) => (
            <Entypo name="dots-three-horizontal" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
