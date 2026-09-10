import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="loginScreen" options={{ headerShown: false }} />

      <Stack.Screen name="signupScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;