import { Activity } from "../types/ActivityData";
import { View, Text, StyleSheet } from "react-native";
import { fireAuth } from "@/services/firebaseConfig";
import { hasUserLikedActivity } from "@/services/activityService";
import { useEffect, useState } from "react";


interface ActivityCardProps {
  item: Activity;
}

export function ActivityCard({ item }: ActivityCardProps) {

  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Actor image: {item.actor.avatar}</Text>
      <Text style={styles.cardText}>Actor name: {item.actor.name}</Text>
      <Text style={styles.cardText}>Action: {item.action}</Text>
      <Text style={styles.cardText}>Action type: {item.object.type}</Text>
      <Text style={styles.cardText}>Action name: {item.object.name}</Text>
      <Text style={styles.cardText}>Time: {item.timestamp}</Text>
    </View>


  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#273c75",
     marginTop: 12,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },

  cardText: {
    color: "#7f8fa6",
  },
});
