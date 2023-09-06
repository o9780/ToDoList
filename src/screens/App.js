import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getDayName = (year, month, day) => {
  const dayIndex = new Date(year, month, day).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[dayIndex];
};

const App = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const renderMonth = (monthIndex) => {
    return (
      <TouchableOpacity
        key={monthIndex}
        style={[
          styles.month,
          selectedMonth === monthIndex && styles.selectedMonth
        ]}
        onPress={() => handleMonthPress(monthIndex)}
      >
        <Text style={styles.monthText}>{months[monthIndex]}</Text>
      </TouchableOpacity>
    );
  };

  const handleMonthPress = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setSelectedDay(null);
  };

  const days = [];
  const monthDays = daysInMonth(new Date().getFullYear(), selectedMonth);
  for (let day = 1; day <= monthDays; day++) {
    days.push(
      <TouchableOpacity
        key={day}
        style={[
          styles.day,
          selectedDay === day && styles.selectedDay
        ]}
        onPress={() => handleDayPress(day)}
      >
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.dayName}>{getDayName(new Date().getFullYear(), selectedMonth, day)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.monthsContainer}
      >
        {months.map((month, index) => renderMonth(index))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      >
        {days}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  monthsContainer: {
    flexDirection: 'row',
  },
  month: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectedMonth: {
    backgroundColor: 'blue',
  },
  monthText: {
    fontSize: 16,
    color: 'black',
  },
  daysContainer: {
    marginTop: 10,
  },
  day: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginRight: 5,
  },
  selectedDay: {
    backgroundColor: 'blue',
    borderColor: 'blue',
    color: 'white',
  },
  dayText: {
    fontSize: 16,
    color: 'black',
  },
  dayName: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  
  selectedInfoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
