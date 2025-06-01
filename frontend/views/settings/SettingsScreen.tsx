import React, { useState } from "react";
import { View, ScrollView, ViewStyle, TextStyle } from "react-native";
import { makeStyles, Text, ListItem, Switch, useThemeMode, Theme } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';

interface StyleProps {
  container: ViewStyle;
  header: TextStyle;
  scrollView: ViewStyle;
}

const SettingsScreen: React.FC = () => {
  const styles = useStyles();
  const { setMode, mode } = useThemeMode();
  const [notifications, setNotifications] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Settings</Text>
      
      <ScrollView style={styles.scrollView}>
        <ListItem bottomDivider>
          <Ionicons name="moon" size={24} color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>Dark Mode</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={mode === 'dark'}
            onValueChange={() => setMode(mode === "dark" ? "light" : "dark")}
          />
        </ListItem>
        
        <ListItem bottomDivider>
          <Ionicons name="notifications" size={24} color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>Notifications</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </ListItem>
        
        <ListItem bottomDivider>
          <Ionicons name="information-circle" size={24} color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>About</ListItem.Title>
            <ListItem.Subtitle>App version 1.0.0</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  scrollView: {
    flex: 1,
  }
}));

export default SettingsScreen;