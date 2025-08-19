import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AIAssistantCard } from '../../components/Marketplace/AIAssistantCard';
import { type AIAssistant, CATEGORIES, type Category } from '../../types';
import { MOCK_ASSISTANTS } from '../../data/mockAssistants';
import { colors } from '../../theme/colors';

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

  const handleAssistantPress = useCallback((_assistant: AIAssistant) => {
    // TODO: Navigate to assistant detail screen
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
      <Text style={[styles.categoryText, selectedCategory === category.id && styles.selectedCategoryText]}>
        {category.name}
      </Text>
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
        <Ionicons
          name={showCategories ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.purple}
        />
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.black} />
            <Text style={styles.emptyTitle}>No assistants found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or category filter</Text>
          </View>
        }
      />
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
});
