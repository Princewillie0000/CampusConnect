import { NewsFeed } from "../types/NewsFeed";
import { View, Text, Image } from "react-native";

interface NewsFeedCardProps {
  item: NewsFeed;
}

export const NewsFeedCard = ({ item }: NewsFeedCardProps) => {
  return (
    <View>
      <Text>{item.title}</Text>
      <Image source={{ uri: item.image }} />
      <Text>Description: {item.description}</Text>
      <Text>Time: {item.timestamp}</Text>
    </View>
  );
};
