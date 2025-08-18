import { Ionicons } from '@expo/vector-icons';
import type React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { AIAssistant } from '../types';

interface AIAssistantCardProps {
  assistant: AIAssistant;
  onPress?: () => void;
}

export const AIAssistantCard: React.FC<AIAssistantCardProps> = ({ assistant, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <View style={styles.logoIcon} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.companyName}>{assistant.name}</Text>
            <View style={styles.brandContainer}>
              <Text style={styles.brandText}>MIDWEST SLEEP</Text>
              <Text style={styles.brandText}>& WELLNESS</Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={3}>
            {assistant.description}
          </Text>

          <View style={styles.metadataContainer}>
            <View style={styles.providerContainer}>
              <View style={styles.providerAvatar} />
              <Text style={styles.providerText}>by {assistant.provider}</Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={12} color="#FCD34D" />
                <Text style={styles.ratingText}>{assistant.rating}</Text>
              </View>

              <View style={styles.usersContainer}>
                <Ionicons name="people-outline" size={12} color="#6B7280" />
                <Text style={styles.usersText}>{assistant.totalUsers}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  logoContainer: {
    marginRight: 12,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FCD34D',
    borderRadius: 12,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  brandContainer: {
    marginBottom: 4,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 12,
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D1D5DB',
    marginRight: 6,
  },
  providerText: {
    fontSize: 11,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  usersText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
});
