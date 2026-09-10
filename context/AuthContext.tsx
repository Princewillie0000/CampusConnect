import { fireAuth } from "@/services/firebaseConfig";
import { useState, useEffect, useContext, createContext } from "react";
import {User, onAuthStateChanged} from "firebase/auth"
import type { ReactNode } from "react";


interface AuthContextType {
    user: User | null,
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


 export const AuthProvider = ({children}: {children: ReactNode}) => {
    //state
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)

    // auth listener 
 useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(fireAuth, (currentUser) => {
   // update user
   setUser(currentUser)
   setLoading(false)
});

     return unsubscribe;
}, [])
    // return provider
    return(
        <AuthContext.Provider value={{user, loading}}>
                {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used inside an Auth provider")
    return context
}