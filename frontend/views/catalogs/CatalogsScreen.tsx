import { FC } from "react";
import { View, ScrollView, ViewStyle, TextStyle } from "react-native";
import { makeStyles, Text, ListItem } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';

interface StyleProps {
  container: ViewStyle;
  header: TextStyle;
  scrollView: ViewStyle;
}

const CatalogsScreen: FC<{
  setActiveScreen: React.Dispatch<React.SetStateAction<'Home' | 'Settings' | 'Catalogs'>>;
}> = ({ setActiveScreen }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#2089dc" 
          onPress={() => setActiveScreen('Settings')}
          style={styles.backButton}
        />
        <Text h4 style={styles.header}>Справочники</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <ListItem bottomDivider key="products">
          <Ionicons name="cube-outline" size={24} color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>Товары</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider key="productTypes">
          <Ionicons name="list-outline" size={24} color="#2089dc" />
          <ListItem.Content>
            <ListItem.Title>Типы товаров</ListItem.Title>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    flex: 1,
  },
  backButton: {
    marginRight: 10,
  },
  scrollView: {
    flex: 1,
  }
}));

export default CatalogsScreen;