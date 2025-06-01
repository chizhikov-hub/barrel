import React from 'react';
import { View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Text, makeStyles, useTheme, Theme } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  navigation?: any; // Optional since it's not used in the component
  activeScreen: 'Home' | 'Settings';
  setActiveScreen: React.Dispatch<React.SetStateAction<'Home' | 'Settings'>>;
}

interface StyleProps {
  container: ViewStyle;
  tabItem: ViewStyle;
  tabText: TextStyle;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  navigation, 
  activeScreen, 
  setActiveScreen 
}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => setActiveScreen('Home')}
      >
        <Ionicons 
          name="home" 
          size={24} 
          color={activeScreen === 'Home' ? theme.colors.primary : theme.colors.grey3} 
        />
        <Text 
          style={[
            styles.tabText, 
            { color: activeScreen === 'Home' ? theme.colors.primary : theme.colors.grey3 }
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => setActiveScreen('Settings')}
      >
        <Ionicons 
          name="settings" 
          size={24} 
          color={activeScreen === 'Settings' ? theme.colors.primary : theme.colors.grey3} 
        />
        <Text 
          style={[
            styles.tabText, 
            { color: activeScreen === 'Settings' ? theme.colors.primary : theme.colors.grey3 }
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    backgroundColor: theme.colors.background,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
}));

export default BottomNavigation;