import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

export default function BlogsScreen() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://centreorg.vercel.app/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAuthor =
      authorFilter === "All" || blog.author === authorFilter;
    return matchesSearch && matchesAuthor;
  });

  const allAuthors = ["All", ...new Set(blogs.map((blog) => blog.author))];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Centre Blog</Text>

      <TextInput
        placeholder="Search by title..."
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* <ScrollView
        horizontal
        contentContainerStyle={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      >
        {allAuthors.map((author) => (
          <TouchableOpacity
            key={author}
            style={[
              styles.filterBtn,
              authorFilter === author && styles.activeFilterBtn,
            ]}
            onPress={() => setAuthorFilter(author)}
          >
            <Text
              style={[
                styles.filterText,
                authorFilter === author && styles.activeFilterText,
              ]}
            >
              {author}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="blue"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredBlogs}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.blogList}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAuthor}>
                By {item.author} · {new Date(item.createdAt).toDateString()}
              </Text>
              <Text style={styles.cardContent}>
                {item.content.slice(0, 100)}...
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#1e293b",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingRight: 10,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    marginRight: 8,
    maxWidth: 120,
    overflow: "hidden",
  },

  filterText: {
    color: "#374151",
    fontSize: 14,
    textAlign: "center",
    numberOfLines: 1,
  },
  activeFilterBtn: {
    backgroundColor: "#2563eb",
  },

  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  blogList: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
    color: "#374151",
  },
});
