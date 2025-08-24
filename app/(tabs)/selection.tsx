import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define colors object
const colors = {
  purple: '#8B5CF6',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7280',
  grayLight: '#E5E7EB',
  background: '#F8F9FA',
  yellow: '#FFB800',
};

// Type definition for AI Assistant
interface AIAssistant {
  id: string;
  name: string;
  author: string;
  description: string;
  rating: number;
  subscribers: number;
  category: string;
  avatar: string;
  about: string;
  services: string;
  additionalInfo: string;
}

// Mock data for the assistant
const ASSISTANT_DATA: AIAssistant = {
  id: '1',
  name: 'Midwest',
  author: 'Midwest Wellness',
  description: 'Sleep & Wellness Specialist',
  rating: 4,
  subscribers: 2063,
  category: 'medical',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  about: 'We specialize in diagnosing and treating sleep disorders while offering personalized wellness solutions to help you feel your best every day. Our expert team is here to support your journey to better sleep, improved energy, and long-term health.',
  services: 'Midwest Sleep and Wellness offers a wide range of care including family medicine. We focus on disease prevention and wellness and have experienced providers to manage chronic and acute illness. Our goal is to provide comprehensive care to ensure best overall health outcomes for our patients.',
  additionalInfo: 'Midwest sleep and wellness also provides complete sleep evaluation and treatments. Conditions such as insomnia and sleep apnea have been proven to lower overall quality of life and can increase depression, anxiety, brain fog, lack of energy, nightmares, weight gain and stress. Untreated sleep apnea is also linked to several severe medical conditions such as heart failure, high blood pressure, stroke, Alzheimer\'s disease, metabolic syndrome and diabetes. Let us help you get the most restful and restorative sleep possible.'
};

function AssistantProfileScreen() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.gray} />
          <Text style={styles.backText}>Back to Marketplace</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: ASSISTANT_DATA.avatar }}
              style={styles.avatar}
            />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.assistantName}>{ASSISTANT_DATA.name}</Text>
            <Text style={styles.authorName}>by {ASSISTANT_DATA.author}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={16} color={colors.yellow} />
                <Text style={styles.statText}>{ASSISTANT_DATA.rating}</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="people" size={16} color={colors.gray} />
                <Text style={styles.statText}>{ASSISTANT_DATA.subscribers} Subscribers</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this AI Assistant</Text>
          <Text style={styles.sectionText}>{ASSISTANT_DATA.about}</Text>
        </View>

        {/* Technologies and Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TECHNOLOGIES AND SERVICES</Text>
          <Text style={styles.sectionText}>{ASSISTANT_DATA.services}</Text>
          <Text style={styles.sectionText}>{ASSISTANT_DATA.additionalInfo}</Text>
        </View>

        {/* Live Demo Button */}
        <View style={styles.demoSection}>
          <TouchableOpacity style={styles.demoButton}>
            <Ionicons name="play-circle" size={20} color={colors.white} />
            <Text style={styles.demoButtonText}>Live Demo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('Home')}
        >
          <Ionicons 
            name={activeTab === 'Home' ? 'home' : 'home-outline'} 
            size={24} 
            color={activeTab === 'Home' ? colors.black : colors.gray} 
          />
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('Marketplace')}
        >
          <Ionicons 
            name={activeTab === 'Marketplace' ? 'storefront' : 'storefront-outline'} 
            size={24} 
            color={activeTab === 'Marketplace' ? colors.black : colors.gray} 
          />
          <Text style={[styles.navText, activeTab === 'Marketplace' && styles.activeNavText]}>Marketplace</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('Favorites')}
        >
          <Ionicons 
            name={activeTab === 'Favorites' ? 'heart' : 'heart-outline'} 
            size={24} 
            color={activeTab === 'Favorites' ? colors.black : colors.gray} 
          />
          <Text style={[styles.navText, activeTab === 'Favorites' && styles.activeNavText]}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('Profile')}
        >
          <Ionicons 
            name={activeTab === 'Profile' ? 'person' : 'person-outline'} 
            size={24} 
            color={activeTab === 'Profile' ? colors.black : colors.gray} 
          />
          <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

export default AssistantProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: colors.gray,
    marginLeft: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    alignItems: 'center',
  },
  assistantName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  authorName: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 16,
  },
  demoSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  demoButton: {
    backgroundColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  demoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  activeNavText: {
    color: colors.black,
    fontWeight: '500',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: colors.black,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
  },
});