// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

// const HomeScreen = () => {
//   const links = [
//     { title: 'About Centre', url: 'https://centreorg.vercel.app/about' },
//     { title: 'Our Services', url: 'https://centreorg.vercel.app/services' },
//     { title: 'Upcoming Events', url: 'https://centreorg.vercel.app/events' },
//     { title: 'Contact Us', url: 'https://centreorg.vercel.app/contact' },
//   ];

//   const openLink = async (url) => {
//     const supported = await Linking.canOpenURL(url);
//     if (supported) {
//       await Linking.openURL(url);
//     } else {
//       alert(`Can't open this URL: ${url}`);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Welcome to Centre Org</Text>
//       <Text style={styles.subtitle}>Empowering student-led innovation</Text>

//       {links.map((link, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.button}
//           onPress={() => openLink(link.url)}
//         >
//           <Text style={styles.buttonText}>{link.title}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     backgroundColor: '#f2f4f7',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#1a1a1a',
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 30,
//     color: '#4f4f4f',
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 10,
//     marginBottom: 15,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default HomeScreen;





import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

export default function Hero() {
  const insets = useSafeAreaInsets();

  const services = [
    {
      title: '📸 Photography & Video',
      desc: 'Professional photography & creative video production.',
      link: 'https://instagram.com/centre_kec1',
      btnText: 'Instagram Page',
    },
    {
      title: '🖼️ Google Photos Upload',
      desc: 'Access high-quality images from our public albums.',
      btnText: 'Google Photos',
    },
    {
      title: '🎥 YouTube Videos',
      desc: 'Watch creative content from our YouTube channel.',
      link: 'https://youtube.com/@CentreKEC',
      btnText: 'YouTube Videos',
    },
    {
      title: '🌍 Community Channels',
      desc: 'Join our Telegram, WhatsApp, and YouTube for updates.',
      btnText: 'WhatsApp Group',
    },
  ];

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 10 }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      <Text style={styles.heading}>🌟 Empowering Creativity & Community</Text>

      <Text style={styles.gradientText}>
        Providing free photography, video production, and digital services for all{' '}
        <Text style={styles.highlight}>CENTRE☠️</Text> members by{' '}
        <Text style={styles.highlight}>CENTRE☠️</Text> members.
      </Text>

      {/* <Link href="/services" asChild>
        <TouchableOpacity style={styles.exploreBtn}>
          <Text style={styles.exploreBtnText}>Explore Services</Text>
        </TouchableOpacity>
      </Link> */}

      <View style={styles.grid}>
        {services.map((service, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardDesc}>{service.desc}</Text>
            {service.link && (
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => handleOpenLink(service.link)}
              >
                <Text style={styles.linkBtnText}>{service.btnText}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>



      <Link href="/about" asChild>
        <TouchableOpacity style={styles.exploreBtn}>
          <Text style={styles.exploreBtnText}>About Centre☠️</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#111',
    marginVertical: 10,
  },
  gradientText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#2563eb', // Tailwind blue-600
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
    marginTop: 8,
  },
  linkBtn: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  exploreBtn: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  exploreBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
