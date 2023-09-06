import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

export default function Tasks() {
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
          <Text style={[styles.monthText, selectedMonth === monthIndex && styles.selectedText]}>{months[monthIndex]}</Text>
        </TouchableOpacity>
      );
    };
  
    const handleMonthPress = (monthIndex) => {
        if(!monthIndex==currentMonth){}
      setSelectedMonth(monthIndex);
    };

    const handleDayPress = (dayIndex) => {
        setSelectedDay(dayIndex);
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
          <Text style={[styles.dayText, selectedDay === day && styles.selectedText]}>{getDayName(new Date().getFullYear(), selectedMonth, day)}</Text>
          <Text style={[styles.dayText, selectedDay === day && styles.selectedText]}>{day}</Text>
        </TouchableOpacity>
      );
    }

  return (
    <View style={{flex:1,backgroundColor:"#4044C9"}}>
      <View style={{flex:1 ,backgroundColor:"#4044C9"}}>
    <Text style={{color:"#fff",fontSize:hp('3%'),top:hp('3%'),left:wp('3%')}}>{months[selectedMonth]+", "+new Date().getFullYear()}</Text>
    <TouchableOpacity>
      <Text style={{backgroundColor:"#fff",width:wp('8%'),fontSize:hp('3.5%'),position:"absolute",borderRadius:hp('1%'),alignSelf:"flex-end",textAlign:"center",color:"#4044C9",right:wp('4%'),bottom:hp('-3.5%')}}>+</Text>
    </TouchableOpacity>
    
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.monthsContainer}
      >
        {months.map((month, index) => renderMonth(index))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
      >
        {days}
      </ScrollView>
      </View>


      <View style={{flex:2,backgroundColor:"#fff",borderTopLeftRadius:hp('8%'),borderTopRightRadius:hp('8%')}}>
      <FlatList>
        
      </FlatList>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

    monthsContainer: {
      flexDirection: 'row',
      height:hp('8%'),
      top:hp('6%')
    },
    month: {
      paddingHorizontal: wp('10%'),
      paddingVertical: hp('1%'),
      borderRadius:wp('5%'),
      height:hp('6%'),
      margin:wp('2%'),
      backgroundColor:"#585DFF"
    },
    selectedMonth: {
        backgroundColor:"#fff",
    },
    selectedText: {
        color: "#4044C9",
        fontWeight:"bold"
    },
    monthText: {
      fontSize: hp('2.5%'),
      color: '#fff',
    },
    daysContainer: {
        flexDirection: 'row',
      height:hp('12%'),
      top:hp('4%')
    },
    day: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
        borderRadius:wp('5%'),
        width:wp('20%'),
        height:hp('10%'),
        margin:wp('2%'),
        backgroundColor:"#585DFF",
        alignItems:"center"
    },
    selectedDay: {
        backgroundColor:"#fff",
    },
    dayText: {
        fontSize: hp('2.25%'),
        color: '#fff',
    },
  });