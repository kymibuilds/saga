import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const { startOAuthFlow: googleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: githubOAuth } = useOAuth({ strategy: "oauth_github" });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  /* OAuth Handlers */
  const onGooglePress = async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.log("Google OAuth error:", err);
    }
  };

  const onGithubPress = async () => {
    try {
      const { createdSessionId, setActive } = await githubOAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.log("Github OAuth error:", err);
    }
  };

  /* Email + Password Flow */
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.log("SignUp error:", err);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.log("Verification error:", err);
    }
  };

  /* -------------------------
      VERIFICATION SCREEN
  ------------------------- */
  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 px-8 justify-center"
        >
          <Text className="text-4xl font-extrabold text-black mb-2 tracking-tight">
            Verify your email
          </Text>
          <Text className="text-gray-600 mb-10">
            Enter the 6-digit code sent to your inbox.
          </Text>

          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="123456"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            className="border border-gray-300 rounded-2xl px-4 py-4 text-lg text-black tracking-wide"
          />

          <TouchableOpacity
            onPress={onVerifyPress}
            className="bg-black rounded-2xl py-4 mt-8"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Verify Email
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  /* -------------------------
      SIGN UP SCREEN
  ------------------------- */
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-8 justify-center"
      >
        {/* Branding */}
        <Text className="text-4xl font-extrabold text-black mb-2 tracking-tight">
          Create an account
        </Text>
        <Text className="text-gray-600 mb-10 text-lg">
          Let's create your account
        </Text>

        {/* OAuth Buttons */}
        <TouchableOpacity
          onPress={onGooglePress}
          className="border border-gray-300 rounded-2xl py-4 mb-3 flex-row items-center justify-center active:opacity-80"
        >
          <View className="flex flex-row items-center gap-2 justify-center">
            <Text className="text-black text-base font-medium">
            Continue with Google
          </Text>
          </View>
        </TouchableOpacity>
        {/* Divider */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-3 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Inputs */}
        <View className="mb-4">
          <Text className="font-medium text-black mb-2">Email</Text>
          <TextInput
            value={emailAddress}
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            placeholder="name@example.com"
            placeholderTextColor="#A1A1A1"
            keyboardType="email-address"
            className="border border-gray-300 rounded-2xl px-4 py-4 text-black text-base"
          />
        </View>

        <View className="mb-6">
          <Text className="font-medium text-black mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry
            className="border border-gray-300 rounded-2xl px-4 py-4 text-black text-base"
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={onSignUpPress}
          className="bg-black rounded-2xl py-4 mb-6 active:opacity-80"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Create an Account
          </Text>
        </TouchableOpacity>

        {/* Footer Link */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-600 mr-1">Already have an account?</Text>
          <Link href="/sign-in" asChild>
            <TouchableOpacity>
              <Text className="font-semibold text-black underline">
                Log In
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
