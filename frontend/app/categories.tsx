import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// Get the API URL from environment variables
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

// Define the Category type based on the backend controller
type Category = {
  id: number;
  name: string;
};

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Get theme-aware colors
  const itemBackgroundColor = useThemeColor({
    light: '#f5f5f5',
    dark: '#2c2c2c'
  }, 'background');

  const borderColor = useThemeColor({
    light: '#e0e0e0',
    dark: '#3d3d3d'
  }, 'text');

  const buttonColor = useThemeColor({
    light: '#20B2AA',
    dark: '#2E8B57'
  }, 'tint');

  const textColor = useThemeColor({
    light: '#000000',
    dark: '#ffffff'
  }, 'text');

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Error fetching categories: ' + (err instanceof Error ? err.message : String(err)));
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
    } catch (err) {
      Alert.alert('Error', 'Failed to create category: ' + (err instanceof Error ? err.message : String(err)));
      console.error('Error creating category:', err);
    }
  };

  // Update a category
  const updateCategory = async () => {
    if (!editingCategory) return;
    if (!editingCategory.name.trim()) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editingCategory.name.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const updatedCategory = await response.json();
      setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
      setEditingCategory(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to update category: ' + (err instanceof Error ? err.message : String(err)));
      console.error('Error updating category:', err);
    }
  };

  // Delete a category
  const deleteCategory = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/categories/${id}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error('Failed to delete category');
              }

              setCategories(categories.filter(cat => cat.id !== id));
            } catch (err) {
              Alert.alert('Error', 'Failed to delete category: ' + (err instanceof Error ? err.message : String(err)));
              console.error('Error deleting category:', err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Load categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Категории товаров', headerShown: true }} />

      <ScrollView style={styles.scrollView}>
        {/* Error message */}
        {error && (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <TouchableOpacity style={styles.retryButton} onPress={fetchCategories}>
              <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}

        {/* Loading indicator */}
        {loading && <ThemedText style={styles.loadingText}>Loading...</ThemedText>}

        {/* Add new category form */}
        <ThemedView style={styles.addCategoryContainer}>
          <ThemedView style={styles.addCategoryForm}>
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Название категории"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholderTextColor={textColor === '#000000' ? '#888888' : '#aaaaaa'}
            />
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: buttonColor }]}
              onPress={createCategory}
            >
              <ThemedText style={styles.addButtonText}>Добавить</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Categories list */}
        {!loading && !error && (
          <ThemedView style={styles.categoriesContainer}>
            {categories.length === 0 ? (
              <ThemedText style={styles.emptyText}>No categories found</ThemedText>
            ) : (
              categories.map((category, index) => (
                <ThemedView 
                  key={category.id} 
                  style={[
                    styles.categoryItem,
                    { 
                      backgroundColor: itemBackgroundColor,
                      borderBottomColor: borderColor,
                    }
                  ]}
                >
                  {editingCategory && editingCategory.id === category.id ? (
                    <ThemedView style={styles.editContainer}>
                      <TextInput
                        style={[styles.editInput, { color: textColor }]}
                        value={editingCategory.name}
                        onChangeText={(text) => setEditingCategory({ ...editingCategory, name: text })}
                        autoFocus
                        placeholderTextColor={textColor === '#000000' ? '#888888' : '#aaaaaa'}
                      />
                      <TouchableOpacity style={styles.iconButton} onPress={updateCategory}>
                        <MaterialIcons name="check" size={24} color="green" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => setEditingCategory(null)}
                      >
                        <MaterialIcons name="close" size={24} color="red" />
                      </TouchableOpacity>
                    </ThemedView>
                  ) : (
                    <ThemedView style={styles.categoryRow}>
                      <ThemedText>{category.name}</ThemedText>
                      <ThemedView style={styles.actionsContainer}>
                        <TouchableOpacity 
                          style={styles.iconButton}
                          onPress={() => setEditingCategory(category)}
                        >
                          <MaterialIcons name="edit" size={24} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.iconButton}
                          onPress={() => deleteCategory(category.id)}
                        >
                          <MaterialIcons name="delete" size={24} color="red" />
                        </TouchableOpacity>
                      </ThemedView>
                    </ThemedView>
                  )}
                </ThemedView>
              ))
            )}
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#d32f2f',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  categoriesContainer: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  categoryItem: {
    padding: 2,
    borderRadius: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  addCategoryContainer: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  addCategoryForm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  addButton: {
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
