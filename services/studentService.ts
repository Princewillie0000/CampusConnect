import { db } from "./firebaseConfig";
import {doc, collection, setDoc} from "firebase/firestore"


const createStudent= async (studentId:string , studentName:string, studentDepartment:string)=>{
       const studentRef = doc(collection(db, "students"), studentId);
       await setDoc(studentRef, {studentId, studentName, studentDepartment });
}

export default createStudent;