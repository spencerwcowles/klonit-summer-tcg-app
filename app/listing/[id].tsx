import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useListingDetail } from '../../hooks/queries/useListings';
import { colors } from '../../theme/colors';
import { mapAPIListingToAIAssistantEnhanced } from '../../utils/mappers';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listingId = id ? Number.parseInt(id, 10) : null;

  const { data: apiListing, isLoading, isError, refetch } = useListingDetail(listingId);

  const assistant = apiListing ? mapAPIListingToAIAssistantEnhanced(apiListing) : null;

  const handleBack = () => {
    router.back();
  };

  const handleTryAssistant = () => {
    // TODO: Navigate to chat screen or implement chat functionality
    console.log('Try assistant:', assistant?.name);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.purple} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.purple} />
          <Text style={styles.loadingText}>Loading assistant details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !assistant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.purple} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.purple} />
          <Text style={styles.errorTitle}>Unable to load assistant</Text>
          <Text style={styles.errorSubtitle}>This assistant may no longer be available.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.purple} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assistant Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.assistantCard}>
          <View style={styles.assistantHeader}>
            <View style={styles.brandContainer}>
              <Text style={styles.brandName}>{assistant.brandName}</Text>
              {assistant.brandSubtitle && <Text style={styles.brandSubtitle}>{assistant.brandSubtitle}</Text>}
            </View>
          </View>

          <Text style={styles.assistantName}>{assistant.name}</Text>
          <Text style={styles.assistantProvider}>by {assistant.provider}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={16} color={colors.purple} />
              <Text style={styles.statText}>{assistant.rating.toFixed(1)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="people" size={16} color={colors.purple} />
              <Text style={styles.statText}>{assistant.totalUsers.toLocaleString()} users</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this Assistant</Text>
          <Text style={styles.description}>{assistant.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{assistant.category}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.placeholderText}>Feature details will be available soon...</Text>
        </View>
      </ScrollView>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.tryButton} onPress={handleTryAssistant}>
          <Text style={styles.tryButtonText}>Try Assistant</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} style={styles.tryButtonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  loadingText: {
    fontSize: 16,
    color: colors.black,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 24,
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
  assistantCard: {
    backgroundColor: colors.white,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  assistantHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandContainer: {
    alignItems: 'center',
    backgroundColor: colors.purple,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 1.5,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 1,
    opacity: 0.9,
  },
  assistantName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  assistantProvider: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.grayLight,
    marginHorizontal: 16,
  },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
  categoryTag: {
    backgroundColor: colors.purple,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.black,
    fontStyle: 'italic',
  },
  actionContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  tryButton: {
    backgroundColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  tryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  tryButtonIcon: {
    marginLeft: 8,
  },
});
