import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  fetchAllActivities,
  hasUserLikedActivity,
  likeActivity,
  unlikeActivity,
} from "@/services/activityService";
import { use, useEffect, useState, useRef, act } from "react";
import { Activity } from "../../types/ActivityData";
import { ActivityCard } from "@/components/ActivityCard";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fireAuth } from "@/services/firebaseConfig";

interface LikedStates {
  [activityId: string]: boolean;
}

const HomeScreen = () => {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [likedStates, setLikedStates] = useState<LikedStates>({});

  const lastTap = useRef<number | null>(null);

  const likedState = async (activityId: string) => {
    const user = fireAuth.currentUser;
    if (!user) return;
    const result = await hasUserLikedActivity(activityId, user.uid);
    setLikedStates((prevState) => ({
      ...prevState,
      [activityId]: result,
    }));
  };

  const handleActivityPress = async (activityId: string) => {
    // get current time
    const now = Date.now();

    // check whether this happened within ~300ms of the previous tap
    const timePressed = lastTap.current !== null && now - lastTap.current < 300;
    lastTap.current = timePressed ? null : now;
    // if yes:
    if (!timePressed) return;

    const user = fireAuth.currentUser;
    if (!user) return;

    const isPostLiked = await hasUserLikedActivity(activityId, user.uid);

    if (isPostLiked) {
      await unlikeActivity(activityId, user.uid);
      setLikedStates((prev) => ({
        ...prev,
        [activityId]: false,
      }));
    } else {
      await likeActivity(activityId, user.uid);
      setLikedStates((prev) => ({
        ...prev,
        [activityId]: true,
      }));

      return;
    }
    //   get current Firebase user
    //   check likedStates[activityId]
    //   if false → likeActivity()
    //   if true  → unlikeActivity()
    //   update likedStates
  };

  // USE EFFECT
  useEffect(() => {
    activities?.forEach((activity) => {
      likedState(activity.id);
    });
  }, [activities]);

  const router = useRouter();

  const allActivities = async () => {
    const result = await fetchAllActivities();
    setActivities(result);
    console.log(result);
  };

  const exploreEvents = () => {
    router.push("/(tabs)/events");
  };

  const createLike = async () => {
    const user = fireAuth.currentUser;
    console.log("user : ", user?.uid);

    if (!user) return;
    const activityId = activities?.[0]?.id;
    console.log("Activity 1: ", activityId);

    if (!activityId) return;

    try {
      await likeActivity(activityId, user.uid);
    } catch (error: any) {
      console.log("LIKE ERROR: ", error);
    }
  };

  useEffect(() => {
    allActivities();
    createLike();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        Connect with friends and explore events and groups.
      </Text>

      <View>
        <Text style={styles.sectionTitle}>Recent Campus Activity</Text>
      </View>

      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => handleActivityPress(item.id)}>
              <ActivityCard item={item} />
            </Pressable>

            <View style={styles.likesAndCommentIcon}>
              <Ionicons
                name={likedStates[item.id] ? "heart" : "heart-outline"}
                size={24}
                color={likedStates[item.id] ? "red" : "black"}
              />

              <Ionicons name="chatbubble-outline" size={22} color="black" />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.activityList}
      />

      <View>
        <TouchableOpacity style={styles.exploreButton} onPress={exploreEvents}>
          <Text style={styles.exploreButtonText}>Explore events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headingText: {
    color: "#2e1065",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    textTransform: "uppercase",
  },

  sectionTitle: {
    color: "#2f3640",
    fontWeight: "700",
    fontSize: 20,
  },

  activityList: {
    // flex: 1,
    backgroundColor: "#dcdde1",
    padding: 20,
  },

  exploreButton: {
    padding: 15,
    margin: 15,
    borderRadius: 15,
    backgroundColor: "#641f1f",
  },

  exploreButtonText: {
    color: "#ecf0f1",
    fontWeight: "700",
    textAlign: "center",
  },

  likesAndCommentIcon: {
    flexDirection: "row",
    gap: 15,
  },
});
