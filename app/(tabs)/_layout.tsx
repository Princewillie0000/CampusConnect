import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";



const TabsLayout = () => {

  return (
    <Tabs
       screenOptions={{
      //   headerShown: false,
      //   tabBarActiveTintColor: "#2563EB",
      //   tabBarInactiveTintColor: "#9CA3AF",
         tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
      //     borderTopWidth: 0,
      //     borderTopLeftRadius: 20,
      //     borderTopRightRadius: 20,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: {
            height: -3,
            width: 0,
          },
         },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen 
      name="map"
      options={{
        title: "Map",
        tabBarIcon: ({color, size}) => (
          <Ionicons name = "map" size={size} color={color}/>
        )
      }}
      
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
