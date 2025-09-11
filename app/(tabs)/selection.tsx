import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AIAssistantCard } from '../../components/Marketplace/AIAssistantCard';
import { colors } from '../../theme/colors';
import type { AIAssistant } from '../../types';

const BASE_URL = 'https://klonit-testing-backend.oielpj.easypanel.host';

export default function MarketplaceScreen() {
  const [assistants, setAssistants] = useState<AIAssistant[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch assistants
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const url = new URL(`${BASE_URL}/marketplace/listings`);
        url.searchParams.append('page', '1');
        url.searchParams.append('per_page', '20');
        if (selectedCategory !== 'all') {
          url.searchParams.append('category', selectedCategory);
        }
        if (searchQuery) {
          url.searchParams.append('search', searchQuery);
        }

        const res = await fetch(url.toString());
        const json = await res.json();
        if (json.success) {
          setAssistants(json.data);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchQuery, selectedCategory]);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/marketplace/categories`);
        const json = await res.json();
        if (json.success) {
          setCategories(['all', ...json.data]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAssistantPress = useCallback((assistant: AIAssistant) => {
    // TODO: Navigate to assistant detail screen
    console.log('Pressed:', assistant.name);
  }, []);

  const renderAssistant = ({ item }: { item: AIAssistant }) => (
    <AIAssistantCard assistant={item} onPress={() => handleAssistantPress(item)} />
  );

  const renderCategory = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[styles.categoryItem, selectedCategory === category && styles.selectedCategoryItem]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Marketplace</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color={colors.black} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for AI assistants ..."
            placeholderTextColor={colors.black}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <TouchableOpacity style={styles.categoriesToggle} onPress={() => setShowCategories(!showCategories)}>
        <Ionicons name="filter" size={20} color={colors.purple} style={styles.filterIcon} />
        <Text style={styles.categoriesTitle}>Categories</Text>
        <Ionicons name={showCategories ? 'chevron-up' : 'chevron-down'} size={20} color={colors.purple} />
      </TouchableOpacity>

      {showCategories && (
        <ScrollView style={styles.categoriesContainer} horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(renderCategory)}
        </ScrollView>
      )}

      {/* Assistants List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.purple} />
        </View>
      ) : (
        <FlatList
          data={assistants}
          renderItem={renderAssistant}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color={colors.black} />
              <Text style={styles.emptyTitle}>No assistants found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search or category filter</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  title: { fontSize: 24, fontWeight: '700', color: colors.purple },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.white },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: colors.black },
  categoriesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  filterIcon: { marginRight: 8 },
  categoriesTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.black },
  categoriesContainer: { backgroundColor: colors.white, maxHeight: 60, borderBottomWidth: 1, borderBottomColor: colors.grayLight },
  categoryItem: { paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 4, borderRadius: 20, backgroundColor: colors.grayLight },
  selectedCategoryItem: { backgroundColor: colors.purple },
  categoryText: { fontSize: 14, color: colors.black },
  selectedCategoryText: { color: colors.white, fontWeight: '600' },
  listContainer: { paddingVertical: 8 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 64, paddingHorizontal: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: colors.black, marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: colors.black, textAlign: 'center', lineHeight: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
