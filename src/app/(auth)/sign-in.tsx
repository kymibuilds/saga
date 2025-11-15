import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const { startOAuthFlow: googleOAuth } = useOAuth({ strategy: "oauth_google" });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  /* Email Sign-In */
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const attempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.log("Sign-in error:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-8 justify-center"
      >
        {/* Header */}
        <Text className="text-4xl font-extrabold text-black mb-2 tracking-tight">
          Welcome back
        </Text>
        <Text className="text-gray-600 mb-10 text-lg">
          Sign in to continue
        </Text>

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
            placeholder="Enter your password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry
            className="border border-gray-300 rounded-2xl px-4 py-4 text-black text-base"
          />
        </View>

        {/* Sign-In Button */}
        <TouchableOpacity
          onPress={onSignInPress}
          className="bg-black rounded-2xl py-4 mb-6 active:opacity-80"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-3 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Google OAuth */}
        <TouchableOpacity
          onPress={async () => {
            try {
              const { createdSessionId, setActive } = await googleOAuth();
              if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.replace("/");
              }
            } catch (err) {
              console.log("Google OAuth error:", err);
            }
          }}
          className="border border-gray-300 rounded-2xl py-4 flex-row items-center justify-center active:opacity-80"
        >
          <Text className="text-black text-base font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600 mr-1">Don't have an account?</Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text className="font-semibold text-black underline">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
