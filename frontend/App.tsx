import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar, Platform, StatusBarStyle } from "react-native";
import { createTheme, ThemeProvider, useTheme } from "@rneui/themed";
import HomeScreen from "./views/home/HomeScreen";
import SettingsScreen from "./views/settings/SettingsScreen";
import BottomNavigation from "./views/BottomNavigation";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

// StatusBar component that uses theme
const StatusBarWithTheme: React.FC = () => {
  const { theme } = useTheme();
  // Use light-content for dark theme and dark-content for light theme
  const barStyle: StatusBarStyle = theme.mode === 'dark' ? 'light-content' : 'dark-content';

  return <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} />;
};

type ScreenType = 'Home' | 'Settings';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('Home');

  const renderScreen = (): React.ReactNode => {
    switch (activeScreen) {
      case 'Home':
        return <HomeScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StatusBarWithTheme />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {renderScreen()}
        </View>
        <BottomNavigation 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
        />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;