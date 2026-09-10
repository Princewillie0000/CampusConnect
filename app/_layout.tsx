import { AuthProvider, useAuth } from "../context/AuthContext";
import { Stack } from "expo-router";


const RootNavigation = ()=>{
  const {user, loading} = useAuth()

    if(loading){
      return null
    }

   return (
     <Stack>
        <Stack.Protected guard={!user}>
          <Stack.Screen 
          name="(auth)"
          options={{headerShown: false}}
          />
        </Stack.Protected>

        <Stack.Protected guard={!!user}>
          <Stack.Screen 
            name="(tabs)"
            options={{headerShown: false}}
          />
        </Stack.Protected>

    </Stack>
   )



}

export default function RootLayout() {
  return <AuthProvider>
    <RootNavigation/>
  </AuthProvider>
    
  
}
