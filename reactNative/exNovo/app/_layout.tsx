import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/app/context/authContext";
import { DataProvider } from "@/app/context/dataContext";

function RootLayoutNav() {
  const { isSignedIn } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <RootLayoutNav />
      </DataProvider>
    </AuthProvider>
  );
}
