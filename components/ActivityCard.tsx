import { Activity } from "../types/ActivityData";
import {View, Text} from "react-native"

interface ActivityCardProps {
    item: Activity
}


export function ActivityCard({item}: ActivityCardProps) {
    return (
        <View>
            <Text>Actor image: {item.actor.avatar}</Text>
            <Text>Actor name: {item.actor.name}</Text>
            <Text>Object name: {item.action}</Text>
            <Text>Action type: {item.object.type}</Text>
            <Text>Action name: {item.object.name}</Text>
            <Text>Time: {item.timestamp}</Text>
        </View>
    )
}