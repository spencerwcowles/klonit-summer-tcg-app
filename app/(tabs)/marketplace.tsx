import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AIAssistantCard } from '../../components/AIAssistantCard';
import { type AIAssistant, CATEGORIES, type Category, MOCK_ASSISTANTS } from '../../types';

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);

  const filteredAssistants = MOCK_ASSISTANTS.filter((assistant) => {
    const matchesSearch =
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || assistant.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const renderAssistant = ({ item }: { item: AIAssistant }) => (
    <AIAssistantCard assistant={item} onPress={() => console.log('Pressed assistant:', item.name)} />
  );

  const renderCategory = (category: Category) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryItem, selectedCategory === category.id && styles.selectedCategoryItem]}
      onPress={() => {
        setSelectedCategory(category.id);
        if (category.id !== 'all') {
          setShowCategories(false);
        }
      }}
    >
      <Text style={[styles.categoryText, selectedCategory === category.id && styles.selectedCategoryText]}>{category.name}</Text>
      {category.count && <Text style={styles.categoryCount}>{category.count}</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Marketplace</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for AI assistants ..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.categoriesToggle} onPress={() => setShowCategories(!showCategories)}>
        <Ionicons name="filter" size={20} color="#8B5CF6" style={styles.filterIcon} />
        <Text style={styles.categoriesTitle}>Categories</Text>
        <Ionicons name={showCategories ? 'chevron-up' : 'chevron-down'} size={20} color="#8B5CF6" />
      </TouchableOpacity>

      {showCategories && (
        <ScrollView style={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
          {CATEGORIES.map(renderCategory)}
        </ScrollView>
      )}

      <FlatList
        data={filteredAssistants}
        renderItem={renderAssistant}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  categoriesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterIcon: {
    marginRight: 8,
  },
  categoriesTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    maxHeight: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  selectedCategoryItem: {
    backgroundColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 16,
    color: '#111827',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  listContainer: {
    paddingVertical: 8,
  },
});
