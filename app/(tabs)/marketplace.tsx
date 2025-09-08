import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AIAssistantCard } from '../../components/Marketplace/AIAssistantCard';
import { useCategories } from '../../hooks/queries/useCategories';
import { useListings } from '../../hooks/queries/useListings';
import { useDebounce } from '../../hooks/useDebounce';
import { colors } from '../../theme/colors';
import type { AIAssistant, Category } from '../../types';
import { mapAPIListingsToAIAssistants } from '../../utils/mappers';

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);

  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch data with React Query
  const {
    listings: apiListings,
    isLoading,
    isError,
    error,
    hasNextPage,
    loadMore,
    isLoadingMore,
    refetch,
  } = useListings({
    category: selectedCategory,
    search: debouncedSearchQuery, // Use debounced search
    perPage: 9,
  });

  const { categories, isLoading: categoriesLoading } = useCategories();

  // Transform API data to UI format
  const assistants = useMemo(() => {
    return mapAPIListingsToAIAssistants(apiListings);
  }, [apiListings]);

  const handleAssistantPress = useCallback((assistant: AIAssistant) => {
    router.push({
      pathname: '/listing/[id]',
      params: { id: assistant.id },
    });
  }, []);

  const renderAssistant = ({ item }: { item: AIAssistant }) => (
    <AIAssistantCard assistant={item} onPress={() => handleAssistantPress(item)} />
  );

  const handleCategoryPress = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all') {
      setShowCategories(false);
    }
  }, []);

  const renderCategory = (category: Category) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryItem, selectedCategory === category.id && styles.selectedCategoryItem]}
      onPress={() => handleCategoryPress(category.id)}
    >
      <Text style={[styles.categoryText, selectedCategory === category.id && styles.selectedCategoryText]}>{category.name}</Text>
      {category.count && <Text style={styles.categoryCount}>{category.count}</Text>}
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isLoadingMore) {
      loadMore();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Marketplace</Text>
      </View>

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

      <TouchableOpacity style={styles.categoriesToggle} onPress={() => setShowCategories(!showCategories)}>
        <Ionicons name="filter" size={20} color={colors.purple} style={styles.filterIcon} />
        <Text style={styles.categoriesTitle}>Categories</Text>
        <Ionicons name={showCategories ? 'chevron-up' : 'chevron-down'} size={20} color={colors.purple} />
      </TouchableOpacity>

      {showCategories && (
        <ScrollView style={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
          {categoriesLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.purple} />
              <Text style={styles.loadingText}>Loading categories...</Text>
            </View>
          ) : (
            categories.map(renderCategory)
          )}
        </ScrollView>
      )}

      {isLoading && assistants.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.purple} />
          <Text style={styles.loadingText}>Loading assistants...</Text>
        </View>
      ) : isError ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.purple} />
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorSubtitle}>Unable to load assistants. Please try again.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={assistants}
          renderItem={renderAssistant}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoadingMore ? (
              <View style={styles.loadMoreContainer}>
                <ActivityIndicator size="small" color={colors.purple} />
                <Text style={styles.loadMoreText}>Loading more...</Text>
              </View>
            ) : null
          }
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.purple,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
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
    color: colors.black,
  },
  categoriesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  filterIcon: {
    marginRight: 8,
  },
  categoriesTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  categoriesContainer: {
    backgroundColor: colors.white,
    maxHeight: 300,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  selectedCategoryItem: {
    backgroundColor: colors.purple,
  },
  categoryText: {
    fontSize: 16,
    color: colors.black,
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 16,
    color: colors.black,
    marginTop: 12,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.purple,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loadMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadMoreText: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 8,
  },
});
