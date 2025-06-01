import React, { FC, useState } from "react";
import { View, TouchableOpacity, ScrollView, useWindowDimensions, ViewStyle } from "react-native";
import { makeStyles, Text, Button, useThemeMode, Theme } from "@rneui/themed";
import { Table } from './components/Table';
import {Ionicons} from "@expo/vector-icons";

interface StyleProps {
  container: ViewStyle;
  horizontalLayout: ViewStyle;
  verticalLayout: ViewStyle;
  text: ViewStyle;
  section: ViewStyle;
}

const HomeScreen: FC = () => {
  const styles = useStyles();
  const { setMode, mode } = useThemeMode();
  const { width, height } = useWindowDimensions();
  const isHorizontal: boolean = width > height;

  const [tables, setTables] = useState(Array.from({ length: 6 }, (_, index) => index + 1));

  const handleAddTable = () => {
    setTables(currentTables => {
      const maxTableNumber = currentTables.length > 0 ? Math.max(...currentTables) : 0;
      return [...currentTables, maxTableNumber + 1];
    });
  };

  const handleDeleteTable = (tableNumber: number) => {
    setTables(currentTables => currentTables.filter(num => num !== tableNumber));
  };

  return (
    <View
      style={[
        styles.container,
        isHorizontal ? styles.horizontalLayout : styles.verticalLayout,
      ]}
    >
      <View style={styles.section}>
        <ScrollView>
          <View style={styles.tablesGrid}>
            {tables.map((tableNumber) => (
                <Table
                    key={tableNumber}
                    number={tableNumber}
                    onDelete={handleDeleteTable}
                />
            ))}
            <TouchableOpacity
                style={[
                  styles.addButton
                ]}
                onPress={handleAddTable}
            >
              <Ionicons name="add-circle" size={48} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text>Популярные товары</Text>
      </View>

      <View style={styles.section}>
        <Text>Категории</Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalLayout: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
  section: {
    flex: 1,
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
}));

export default HomeScreen;