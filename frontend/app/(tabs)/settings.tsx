import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

// Define a type for settings items
type SettingItem = {
  id: string;
  title: string;
  onPress: () => void;
};

// Define a type for settings categories
type SettingCategory = {
  id: string;
  title: string;
  items: SettingItem[];
};

export default function SettingsScreen() {
  // Get theme-aware colors
  const itemBackgroundColor = useThemeColor({
    light: '#f5f5f5',
    dark: '#2c2c2c'
  }, 'background');

  const borderColor = useThemeColor({
    light: '#e0e0e0',
    dark: '#3d3d3d'
  }, 'text');

  // Define settings categories
  const [categories] = useState<SettingCategory[]>([
    {
      id: 'references',
      title: 'Справочники',
      items: [
        {
          id: 'product-categories',
          title: 'Категории товаров',
          onPress: () => console.log('Navigate to Product Categories')
        },
        {
          id: 'products',
          title: 'Товары',
          onPress: () => console.log('Navigate to Products')
        }
      ]
    }
  ]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText type="title" style={styles.screenTitle}>Настройки</ThemedText>
        
        {categories.map((category) => (
          <ThemedView key={category.id} style={styles.categoryContainer}>
            <ThemedText type="subtitle" style={styles.categoryTitle}>
              {category.title}
            </ThemedText>
            
            {category.items.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.settingItem, 
                  { 
                    backgroundColor: itemBackgroundColor,
                    borderBottomWidth: index === category.items.length - 1 ? 0 : 1,
                    borderBottomColor: borderColor
                  }
                ]}
                onPress={item.onPress}
              >
                <ThemedText>{item.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    marginBottom: 24,
    marginTop: 60, // Add space for the status bar
  },
  categoryContainer: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  categoryTitle: {
    marginBottom: 12,
  },
  settingItem: {
    padding: 16,
    borderRadius: 4,
  }
});