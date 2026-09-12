import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { NewsFeed } from "../../types/NewsFeed";
import { NewsFeedCard } from "@/components/NewsFeed";

import { fetchAllActivities } from "@/services/activityService";
import { useEffect, useState } from "react";
import {Activity} from "../../types/ActivityData"
import { ActivityCard } from "@/components/ActivityCard";
import { useRouter } from "expo-router";

const HomeScreen = () => {

    const [activities, setActivities] = useState<Activity[] | null>(null)
    const router = useRouter()

    const allActivities = async ()=>{
        const result = await fetchAllActivities()
        setActivities(result)
        console.log(result);
        
    }


    const exploreEvents = ()=>{
        router.push("/(tabs)/events")
    }

  const newsFeeds: NewsFeed[] = [
    {
      id: "1",
      image: "https://example.com/career-fair.jpg",
      title: "Campus Career Fair",
      description:
        "Meet employers, discover internship opportunities, and build your professional network.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      image: "https://example.com/study-group.jpg",
      title: "New Study Groups Available",
      description:
        "Join other students and collaborate on assignments, projects, and exam preparation.",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      image: "https://example.com/music-event.jpg",
      title: "Live Music on Campus",
      description:
        "Come enjoy live performances and connect with other students this Friday evening.",
      timestamp: "Yesterday",
    },
  ];

  useEffect(()=>{
    allActivities()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.headingText}>
        Connect with friends and explore events and groups.
      </Text>
      
      <View>
        <Text>Recent Campus Activity</Text>
      </View>

      <FlatList
        data={activities}
        renderItem={({ item }) => <ActivityCard item={item} />}
        keyExtractor={(item) => item.id}
      />

      <View>
        <TouchableOpacity 
         style={{
            padding: 15,
            margin: 15,
            borderRadius: 15,
            backgroundColor: "#641f1f",
            
           
          }}
        onPress={exploreEvents}
        > 
        <Text style={{color: "#ecf0f1", fontWeight: 700, textAlign: "center"}}>
            Explore events
        </Text>
         </TouchableOpacity>
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headingText: {
    color: "#2e1065",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    textTransform: "uppercase",
  },
});
