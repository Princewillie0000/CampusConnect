
export interface Activity {
    id: string,
    actor : {
        id: string,
        avatar: string,
        name: string
    },

    action: string,
    object: {
        id: string,
        type: "event" | "group",
        name: string
    },
    timestamp: string
}


