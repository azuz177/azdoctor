import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.azdoctor',
  appName: 'AZDoctor',
  webDir: 'dist',
  server: {
    // For live preview during development, point this at your Lovable preview URL.
    // Remove `url` before building a production binary for the stores.
    url: 'https://id-preview--16f824b9-bb95-497a-90db-a95ea1c57ede.lovable.app',
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: '#ffffff',
  },
};

export default config;
