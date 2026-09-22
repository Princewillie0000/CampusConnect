import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import {
  createComment,
  fetchAllActivities,
  fetchComments,
  hasUserLikedActivity,
  likeActivity,
  unlikeActivity,
} from "@/services/activityService";
import { useEffect, useState, useRef, act, use } from "react";
import { Activity } from "../../types/ActivityData";
import { ActivityCard } from "@/components/ActivityCard";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fireAuth } from "@/services/firebaseConfig";
import { doc } from "firebase/firestore";
import { fetchAllEvents } from "@/services/eventsService";

interface LikedStates {
  [activityId: string]: boolean;
}

interface Comments {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

const HomeScreen = () => {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [likedStates, setLikedStates] = useState<LikedStates>({});
  const [commentModalVisible, setCommentModalVisible] =
    useState<boolean>(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );
  const [comments, setComments] = useState<Comments[]>([]);
  const lastTap = useRef<number | null>(null);
  const [commentText, setCommentText] = useState<string>("");

  const likedState = async (activityId: string) => {
    const user = fireAuth.currentUser;
    if (!user) return;
    const result = await hasUserLikedActivity(activityId, user.uid);
    setLikedStates((prevState) => ({
      ...prevState,
      [activityId]: result,
    }));
  };

  // OPEN MODAL FUNCTION FOR COMMENTS
  /**
   * Opens the comments modal for a selected activity.
   * Fetches the activity's existing comments from Firestore
   * and stores them in the comments state before displaying the modal.
   *
   * @param activityId - The ID of the activity whose comments should be displayed.
   */
  const openComments = async (activityId: string) => {
    setSelectedActivityId(activityId);

    // CALLS THE
    await commentsFromDb(activityId);

    setCommentModalVisible(true);
  };

  // COMMENTS
  /**
   * Fetches all comments for a specific activity from Firestore
   * and stores the result in the comments state.
   *
   * @param activityId - The ID of the activity whose comments should be fetched.
   */

  const commentsFromDb = async (activityId: string) => {
    const commentsResult = await fetchComments(activityId);
    setComments(commentsResult);
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

  // CREATE COMMENT FUNCTION
  /**
   * Adds a new comment to the selected activity.
   * Validates the current user, selected activity, and comment text,
   * creates the comment in Firestore, refreshes the comments list,
   * and clears the input field.
   */
  const addComment = async () => {
    // get current user
    const user = fireAuth.currentUser;
    // make sure selectedActivityId exists
    if (!selectedActivityId) return;
    if (!user) return;
    // make sure commentText isn't empty
    if (commentText.trim() === "") return;

    // call createComment()
    await createComment(selectedActivityId, commentText.trim(), user.uid);

    // fetch comments again
    commentsFromDb(selectedActivityId);

    // clear commentText
    setCommentText("");
    displayMessage(`✅ Comment from ${user.uid} successfully added.`)
    console.log("Handle called to add");
  };


  const displayMessage = (msg: string)=> {
    
    Alert.alert(msg)
  }

  useEffect(() => {
    allActivities();
    // createLike();
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

              <Pressable onPress={() => openComments(item.id)}>
                <Ionicons name="chatbubble-outline" size={22} color="black" />
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.activityList}
      />

      <Modal
        visible={commentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              minHeight: 300,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View style={styles.commentPanel}>
              <View style={styles.commentsHeader}>
                <Text style={styles.commentsTitle}>Comments</Text>
                <Pressable onPress={() => setCommentModalVisible(false)}>
                  <Ionicons name="close" size={24} color="black" />
                </Pressable>
              </View>

              {comments.map((comment) => (
                <Text key={comment.id}>{comment.text}</Text>
              ))}

              <TextInput
                style={styles.commentInput}
                value={commentText}
                onChangeText={setCommentText}
                placeholder="write a comment"
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity style={styles.postCommentButton}>
                <Text style={styles.postCommentButtonText} onPress={addComment}>
                  {" "}
                  Add comment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

  postCommentButton: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#641f1f",
    width: "40%",
  },

  postCommentButtonText: {
    color: "#ecf0f1",
  },

  commentPanel: {
    backgroundColor: "#FFFFFF",
    minHeight: 300,
    maxHeight: "80%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 15,
  },

  commentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  commentsTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  commentInput: {
    width: "100%",
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
  },
});
