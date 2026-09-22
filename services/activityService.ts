import {Activity} from "../types/ActivityData"
import {doc, collection, setDoc, deleteDoc, serverTimestamp, getDocs, addDoc, getDoc} from "firebase/firestore"
import { db } from "./firebaseConfig";

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

export async function createActivity(activityId: string){
    const activityRef = doc(collection(db, "activities"), activityId)
    await setDoc(activityRef, {activityId})
}


export async function likeActivity(activityId: string, userId:string){
    const likeRef = doc(db, "activities", activityId, "likes", userId)
        await setDoc(likeRef, { userId, createdAt: serverTimestamp()})
}


export async function unlikeActivity(activityId: string, userId: string){
        const unlikeRef = doc(db, "activities", activityId, "likes", userId)
         await deleteDoc(unlikeRef)
}


export async function hasUserLikedActivity(activityId: string, userId: string) {
        const checkLikeRef = doc(db, "activities", activityId, "likes", userId)
        const getRef = await getDoc(checkLikeRef)

        // if (getRef.exists()){
        //     return true
        // } else {
        //     return false
        // }

        // OR 

        return getRef.exists()
    
}


export async function createComment(activityId: string, text:string, userId:string){
    const commentRef = await addDoc(collection(db, "activities", activityId, "comments"), {
        text,
        userId,
        createdAt: serverTimestamp()
    })
    return commentRef;
}


export async function fetchComments(activityId: string){
    const checkCommentsRef = collection(db, "activities", activityId, "comments")
    const snapShot = await getDocs(checkCommentsRef)
  
    const comments = snapShot.docs.map((doc)=> ({
        id: doc.id,
        userId: doc.data().userId,
        text: doc.data().text,
        createdAt: doc.data().createdAt
    }))
    return comments;
}