import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Category } from '../../types';
import { colors } from '../../theme/colors';

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategory: string;
  showCategories: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  selectedCategory,
  showCategories,
  onToggle,
  onSelect,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.categoriesToggle} onPress={onToggle}>
        <Ionicons name="filter" size={20} color={colors.purple} style={styles.filterIcon} />
        <Text style={styles.categoriesTitle}>Categories</Text>
        <Ionicons
          name={showCategories ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.purple}
        />
      </TouchableOpacity>

      {showCategories && (
        <ScrollView style={styles.dropdownContainer} showsVerticalScrollIndicator={false}>
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
                onPress={() => onSelect(category.id)}
              >
                <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                  {category.name}
                </Text>
                {category.count !== undefined && (
                  <Text style={styles.categoryCount}>{category.count}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  dropdownContainer: {
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
    borderBottomColor: '#F9FAFB',
  },
  selectedCategoryItem: {
    backgroundColor: colors.grayLight,
  },
  categoryText: {
    fontSize: 16,
    color: '#111827',
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 14,
    color: colors.purple,
    fontWeight: '500',
  },
});
