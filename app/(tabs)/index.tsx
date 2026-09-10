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


const HomeScreen = () => {

    const [activities, setActivities] = useState<Activity[] | null>(null)

    const allActivities = async ()=>{
        const result = await fetchAllActivities()
        setActivities(result)
        console.log(result);
        
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
