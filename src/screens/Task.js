import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getDayName = (year, month, day) => {
  const dayIndex = new Date(year, month, day).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[dayIndex];
};

export default function Task() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const handleMonthChange = (monthIndex) => {
    if (monthIndex !== currentMonth) {
      setSelectedDay(null);
    }
    setSelectedMonth(monthIndex);
  };

  const renderMonthOptions = () => {
    return months.map((month, index) => (
      <Picker.Item key={index} label={month+" "+new Date().getFullYear()} value={index} />
    ));
  };

  const handleDayPress = (dayIndex) => {
    setSelectedDay(dayIndex);
  };

  const renderDays = () => {
    const days = [];
    const monthDays = daysInMonth(new Date().getFullYear(), selectedMonth);
    for (let day = 1; day <= monthDays; day++) {
      // if (selectedMonth === currentMonth && day < currentDay) {
      //   continue;
      // }

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.day,
            selectedDay === day && styles.selectedDay
          ]}
          onPress={() => handleDayPress(day)}
        >
          <Text style={[styles.dayText, selectedDay === day && styles.selectedText]}>
            {getDayName(new Date().getFullYear(), selectedMonth, day)}
          </Text>
          <Text style={[styles.dayText, selectedDay === day && styles.selectedText]}>{day}</Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#4044C9" }}>
      <View style={{ flex: 1, backgroundColor: "#4044C9" }}>
        <Text style={{ color: "#fff", fontSize: hp('3%'), top: hp('3%'), left: wp('3%') }}>
          
        </Text>
        <TouchableOpacity>
      <Text style={{backgroundColor:"#fff",width:wp('8%'),fontSize:hp('3.5%'),position:"absolute",borderRadius:hp('1%'),alignSelf:"flex-end",textAlign:"center",color:"#4044C9",right:wp('4%'),bottom:hp('-3.5%')}}>+</Text>
    </TouchableOpacity>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => handleMonthChange(itemValue)}
          mode="dropdown"
          style={{ width: wp('51%'), alignSelf: 'center', color: 'white'}}
        >
          {renderMonthOptions()}
        </Picker>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daysContainer}
        >
          {renderDays()}
        </ScrollView>
      </View>

      <View style={{ flex: 2, backgroundColor: "#fff", borderTopLeftRadius: hp('8%'), borderTopRightRadius: hp('8%') }}>
        {/* ... (rest of your FlatList or content) */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  monthsContainer: {
    flexDirection: 'row',
    height: hp('8%'),
    top: hp('6%')
  },
  month: {
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('5%'),
    height: hp('6%'),
    margin: wp('2%'),
    backgroundColor: "#585DFF"
  },
  selectedMonth: {
    backgroundColor: "#fff",
  },
  selectedText: {
    color: "#4044C9",
    fontWeight: "bold"
  },
  monthText: {
    fontSize: hp('2.5%'),
    color: '#fff',
  },
  daysContainer: {
    flexDirection: 'row',
    height: hp('12%'),
    top: hp('4%')
  },
  day: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderRadius: wp('5%'),
    width: wp('20%'),
    height: hp('10%'),
    margin: wp('2%'),
    backgroundColor: "#585DFF",
    alignItems: "center"
  },
  selectedDay: {
    backgroundColor: "#fff",
  },
  dayText: {
    fontSize: hp('2.25%'),
    color: '#fff',
  },
});
