import { Ionicons } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import type { AIAssistant } from '../../types';

type SelectionScreenProps = {
  assistant: AIAssistant;
  onBack: () => void;
};

export default function SelectionScreen({ assistant, onBack }: SelectionScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color={colors.black} />
            <Text style={styles.backText}>Back to Marketplace</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
          {assistant.avatar ? (
          <Image 
            source={{ uri: assistant.avatar }}
            style={styles.profileImage}
          />
        ) : (
          <View style={[styles.profileImage, styles.defaultAvatar]}>
            <Ionicons name="person" size={40} color={colors.black} />
          </View>
        )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.assistantName}>{assistant.name}</Text>
            <Text style={styles.creatorName}>by {assistant.creator || 'AI Creator'}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.statText}>{assistant.rating || '4.5'}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="people" size={16} color={colors.black} />
                <Text style={styles.statText}>{assistant.subscribers || '2063'} Subscribers</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this AI Assistant</Text>
          <Text style={styles.description}>{assistant.description}</Text>
        </View>

        {/* Technologies and Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNOLOGIES AND SERVICES</Text>
          <Text style={styles.description}>
            {assistant.services || `${assistant.name} offers a wide range of services and capabilities. Our advanced AI technology provides comprehensive solutions tailored to your specific needs and requirements.`}
          </Text>
          
          {assistant.detailedDescription && (
            <Text style={styles.description}>
              {assistant.detailedDescription}
            </Text>
          )}
        </View>

        {/* Live Demo Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.liveDemoButton}>
            <Ionicons name="play-circle" size={20} color={colors.white} />
            <Text style={styles.liveDemoText}>Live Demo</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color={colors.black} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="grid-outline" size={24} color={colors.black} />
          <Text style={styles.tabText}>Marketplace</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart-outline" size={24} color={colors.black} />
          <Text style={styles.tabText}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color={colors.black} />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 4,
    color: colors.black,
    fontSize: 16,
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: 'flex-start',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.grayLight,
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  assistantName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  creatorName: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  liveDemoButton: {
    backgroundColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  liveDemoText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100, // Space for tab bar
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingBottom: 34, // Safe area for home indicator
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    color: colors.black,
    marginTop: 4,
  },
});

// Update your colors object to include these if not already present:
// colors = {
//   ...colors,
//   white: '#FFFFFF',
//   black: '#000000',
//   grayLight: '#F0F0F0',
//   purple: '#6B46C1',
//   background: '#F8F8F8',
// };