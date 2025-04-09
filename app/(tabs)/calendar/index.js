import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";

const { width } = Dimensions.get("window");

const BirthdayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [birthdays, setBirthdays] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async () => {
    try {
      const res = await fetch("https://centreorg.vercel.app/api/birthdays");
      const data = await res.json();

      const marked = {};
      data.forEach((member) => {
        const date = format(new Date(member.birthday), "yyyy-MM-dd");
        marked[date] = {
          marked: true,
          dotColor: "blue",
          activeOpacity: 0,
        };
      });

      setBirthdays(data);
      setMarkedDates(marked);
    } catch (error) {
      console.error("Error fetching birthdays:", error);
    }
  };

  const getBirthdaysForDate = (dateStr) => {
    return birthdays.filter(
      (b) => format(new Date(b.birthday), "yyyy-MM-dd") === dateStr
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎉 Birthday Calendar</Text>

      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          ...markedDates,
          ...(selectedDate && {
            [selectedDate]: {
              selected: true,
              selectedColor: "#3b82f6",
              marked: markedDates[selectedDate]?.marked,
              dotColor: markedDates[selectedDate]?.dotColor,
            },
          }),
        }}
        theme={{
          calendarBackground: "#fff",
          textSectionTitleColor: "#000",
          selectedDayBackgroundColor: "#3b82f6",
          selectedDayTextColor: "#fff",
          todayTextColor: "#3b82f6",
          dayTextColor: "#000",
          arrowColor: "#3b82f6",
        }}
        style={styles.calendar}
      />

      <View style={styles.listContainer}>
        <Text style={styles.subheading}>🎂 Birthdays on Selected Day</Text>
        <FlatList
          data={getBirthdaysForDate(selectedDate)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.birthdayItem}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>
                {format(new Date(item.birthday), "do MMMM yyyy")}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noBirthdays}>No birthdays on this day.</Text>
          }
        />
      </View>
    </View>
  );
};

export default BirthdayCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#f0f4ff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#1f2937",
  },
  calendar: {
    borderRadius: 10,
    elevation: 2,
  },
  listContainer: {
    marginTop: 20,
    flex: 1,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  birthdayItem: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  noBirthdays: {
    textAlign: "center",
    color: "#888",
    marginTop: 10,
  },
});
