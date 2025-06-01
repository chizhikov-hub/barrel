import { FC, useState } from "react";
import { View, ScrollView, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { makeStyles, Text, ListItem, Switch, useThemeMode, Theme } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import {ScreenType} from "../../types/ScreenType";

interface StyleProps {
  container: ViewStyle;
  header: TextStyle;
  scrollView: ViewStyle;
}

const SettingsScreen: FC<{
  setActiveScreen: React.Dispatch<React.SetStateAction<ScreenType>>;
}> = ({ setActiveScreen }) => {
  const styles = useStyles();
  const { setMode, mode } = useThemeMode();
  const [notifications, setNotifications] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Settings</Text>

      <ScrollView style={styles.scrollView}>
        <ListItem bottomDivider key="mode">
          <Ionicons name="moon" size={24} color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>Dark Mode</ListItem.Title>
          </ListItem.Content>
          <Switch
            value={mode === 'dark'}
            onValueChange={() => setMode(mode === "dark" ? "light" : "dark")}
          />
        </ListItem>

        <ListItem bottomDivider key="catalogs" onPress={() => setActiveScreen('Catalogs')}>
          <Ionicons name="reader-outline" size={24} color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>Справочники</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  scrollView: {
    flex: 1,
  }
}));

export default SettingsScreen;
