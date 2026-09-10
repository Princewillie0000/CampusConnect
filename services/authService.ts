import { fireAuth,  } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const registerStudent = async (email: string, password: string) =>{
    const result = await createUserWithEmailAndPassword(fireAuth, email, password)
    return result;
};


export const loginStudent = async (email:string, password:string) =>{
 const result = await signInWithEmailAndPassword(fireAuth, email, password)
 return result;
}