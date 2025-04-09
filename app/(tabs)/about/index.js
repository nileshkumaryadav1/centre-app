import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { MotiView } from 'moti';

export default function About() {
  const [year, setYear] = useState(new Date().getFullYear());
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const sectionStyle = [styles.section, isDark && styles.sectionDark];
  const textColor = isDark ? '#fff' : '#111';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 800 }}
        style={styles.header}
      >
        <Text style={[styles.title, { color: textColor }]}>
          Centre☠️ Organization
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          🚀 A <Text style={styles.bold}>student-led, non-profit</Text> tech squad 🤝
        </Text>
      </MotiView>

      {/* Who We Are */}
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 800, delay: 300 }}
        style={sectionStyle}
      >
        <Text style={[styles.sectionTitle, { color: textColor }]}>Who We Are 🤖</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          <Text style={styles.bold}>Centre Private Limited</Text> is a{' '}
          <Text style={styles.bold}>17-member student-led tech family</Text> focused on making
          everyday life easier with <Text style={styles.italic}>photography 📸, videography 🎥, and event management 🎉</Text>. We are a <Text style={styles.italic}>non-profit</Text> group, working exclusively for our <Text style={styles.bold}>17 members</Text>.
        </Text>
      </MotiView>

      {/* What We Do */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 800, delay: 600 }}
        style={sectionStyle}
      >
        <Text style={[styles.sectionTitle, { color: textColor }]}>What We Do 💡</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>📷 <Text style={styles.bold}>Photography & Videography</Text> – Covering events, birthdays, and college functions.</Text>
          <Text style={styles.bullet}>🎉 <Text style={styles.bold}>Event & Tour Planning</Text> – Making your moments unforgettable.</Text>
          <Text style={styles.bullet}>📂 <Text style={styles.bold}>Google Photos Uploads</Text> – Securely storing digital memories.</Text>
          <Text style={styles.bullet}>📲 <Text style={styles.bold}>Community Spaces</Text> – Stay connected via Telegram, WhatsApp, and Instagram.</Text>
        </View>
      </MotiView>

      {/* Gaming & Hackathons */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 800, delay: 900 }}
        style={sectionStyle}
      >
        <Text style={[styles.sectionTitle, { color: textColor }]}>Gaming & Hackathons 🎮</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          We are making our *college debut* in gaming and hackathons under our new team name, <Text style={styles.bold}>Centre</Text> 🎮💻. Passionate about tech and competition, we push our limits in innovation, coding, and esports.
        </Text>
      </MotiView>

      {/* Our Vision */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 800, delay: 1200 }}
        style={[sectionStyle, { marginBottom: 40 }]}
      >
        <Text style={[styles.sectionTitle, { color: textColor }]}>Our Vision 🌟</Text>
        <Text style={[styles.sectionText, { color: textColor }]}>
          Our goal is to <Text style={styles.italic}>support, empower, and innovate</Text>. Centre Private Limited is not just a group—it’s a <Text style={styles.bold}>family of creators</Text>, building tech-driven solutions while having fun. 🎉
        </Text>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f4ff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  sectionDark: {
    backgroundColor: '#1f2937',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  bulletContainer: {
    marginTop: 8,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});
