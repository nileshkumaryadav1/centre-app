import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  useEffect(() => {
    fetch('http://centreorg.vercel.app/api/members')
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setFilteredMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching members:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = members.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || member.role === selectedRole;
      return matchesSearch && matchesRole;
    });
    setFilteredMembers(filtered);
  }, [searchTerm, selectedRole, members]);

  const uniqueRoles = ['All', ...new Set(members.map((m) => m.role))];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Meet Our Members</Text>
      <Text style={styles.total}>Total Members: {members.length}</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <ScrollView horizontal style={styles.roleScroll} showsHorizontalScrollIndicator={false}>
        {uniqueRoles.map((role) => (
          <TouchableOpacity
            key={role}
            style={[styles.roleBtn, selectedRole === role && styles.activeRoleBtn]}
            onPress={() => setSelectedRole(role)}
          >
            <Text style={[styles.roleText, selectedRole === role && styles.activeRoleText]}>
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredMembers.length === 0 ? (
        <Text style={styles.noResult}>No matching members found.</Text>
      ) : (
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
              <Text style={styles.bio}>{item.bio}</Text>

              <View style={styles.socials}>
                {item.instagramLink && (
                  <TouchableOpacity onPress={() => Linking.openURL(item.instagramLink)}>
                    <FontAwesome name="instagram" size={22} color="#E1306C" />
                  </TouchableOpacity>
                )}
                {item.linkedinLink && (
                  <TouchableOpacity onPress={() => Linking.openURL(item.linkedinLink)}>
                    <FontAwesome name="linkedin" size={22} color="#0077B5" />
                  </TouchableOpacity>
                )}
                {item.githubLink && (
                  <TouchableOpacity onPress={() => Linking.openURL(item.githubLink)}>
                    <FontAwesome name="github" size={22} color="#000" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 8,
  },
  total: {
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
    color: '#4b5563',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  roleScroll: {
    marginBottom: 12,
  },
  roleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  activeRoleBtn: {
    backgroundColor: '#6b21a8',
  },
  roleText: {
    color: '#333',
  },
  activeRoleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  role: {
    color: '#6b21a8',
    marginBottom: 4,
  },
  bio: {
    color: '#4b5563',
    fontSize: 12,
    textAlign: 'center',
  },
  socials: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  noResult: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
