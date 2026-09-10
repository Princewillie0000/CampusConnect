import {Activity} from "../types/ActivityData"

const activities: Activity[] = [
    {
    id: "1",
    actor: {
        id: "1",
        avatar: "photos.com",
        name: "Peter"
    },

    action: "created",
    object: {
        id: "1",
        type: "event",
        name:"Toronto tech concert"
    },
    timestamp: "2:30"
},

{
    id: "2",
    actor: {
        id: "2",
        avatar: "image_2",
        name: "John"
    },

    action: "joined",
    object: {
        id: "2",
        type: "group",
        name: "MADS night class"
    },
    timestamp: "12:00am"
},

{
    id: "3",
    actor: {
        id: "3",
        avatar: "image_3",
        name: "Steve"
    },

    action: "created",
    object: {
        id: "3",
        type: "group",
        name: "Cyber security morning class"
    },
    timestamp: "7:00am"
}
]



export function fetchAllActivities(){
        return activities;
}