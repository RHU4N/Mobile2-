import { Platform } from 'react-native';

const defaultBaseUrl = Platform.select({
  android: 'http://10.0.2.2:8081',
  ios: 'http://localhost:8081',
  web: 'http://localhost:8081',
  default: 'http://localhost:8081',
});

export const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL ?? defaultBaseUrl ?? 'http://localhost:8081';
