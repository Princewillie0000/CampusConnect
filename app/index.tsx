import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";


const Index = () => {
    const {user, loading} = useAuth()

if (loading) {
    return null
}

if(user){
    return <Redirect href={"/(tabs)"}/>
}

return <Redirect href={"/loginScreen"} />
    
}

export default Index;