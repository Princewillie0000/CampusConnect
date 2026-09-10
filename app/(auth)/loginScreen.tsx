import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { loginStudent } from "../../services/authService";

const LoginScreen = () => {
  // instance of the use router method.
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    if (!email) {
      setError("Please provise a correct email address.");
      return;
    }

    if (!password) {
      setError("Please provide your correct password.");
      return;
    }

    try {
      //call the LOGIN SERVICE
      const result = await loginStudent(email, password);
      console.log("Logged in user:", result.user.uid);
      // router.replace("/(tabs)")
    } catch (error: any) {
      setError(error.message);
    }
  };

  // re-route user to the sigup screen if they havent registered.
  const navigateToSignUp = () => {
    router.push("/signupScreen");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text>Welcome back</Text>

          <Text style={styles.subtitle}>
            Sign in to continue to CampusConnect.
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError("");
              }}
              placeholder="Enter email address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setPassword(text);
                if (error) setError("");
              }}
              placeholder="Enter password"
              secureTextEntry
            />
          </View>

          {/* A UI for Error. */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account?.</Text>

            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.signupLink}>Sign-up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  formContainer: {
    width: "100%",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
    marginBottom: 28,
  },

  formGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },

  error: {
    fontSize: 14,
    lineHeight: 20,
    color: "#DC2626",
    marginBottom: 16,
  },

  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },

  signupText: {
    fontSize: 14,
    color: "#6B7280",
  },

  signupLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
});
