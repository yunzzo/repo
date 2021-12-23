import React, {useState} from 'react';
import {FlatList,StyleSheet, Text, View, Button, Pressable, Image, TouchableOpacity, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import EditDeleteModal from "../components/EditDeleteModal"
const HistoryScreen =(props)=>{

    const renderItem = ({ item }) => {
      //개별 이미지 넣기(실패)
       //console.log("프린트",parseInt(item.key));
  
      // if (parseInt(item.key) == 1) {
      //   setResource(require("../images/food.png"));
      // } else if (parseInt(item.key) == 2) {
      //   setResource(require("../images/hobby.png"));
      // } else if (parseInt(item.key) == 3) {
      //   setResource(require("../images/music.png"));
      // } else if (parseInt(item.key) == 4) {
      //   setResource(require("../images/culture.png"));
      // } else if (parseInt(item.key) == 5) {
      //   setResource(require("../images/place.png"));
      // } else if (parseInt(item.key) == 6) {
      //   setResource(require("../images/present.png"));
      // } else {
      //   setResource(require("../images/custom.png"));
      // };
      return (
        <View style={styles.tasteContainer}>
          <View style={styles.title}>
          <Image source={require("../components/images/history_icon_default_2x.png")}
            style = {{ marginRight: 10, width: 40, height: 40}}></Image>
            <Text style={{ marginLeft : 10, fontSize: "20", fontWeight: "bold" }}>{item.date}</Text>
            <Ionicons style = {{marginLeft: 170}}size = {20} title = "edit-button" name="ellipsis-vertical-outline" />
          </View>
          <View style={styles.textsContainer}>
            <Text style={{ color: "grey" }}>{item.content}</Text>
          </View>
        </View>
      );
    };
    return (
      <View style={styles.screen}>
        <FlatList data={props.historyArray.reverse()} renderItem={renderItem} />
  
        <View style={styles.roundButton}>
        <TouchableOpacity onPress={() => {props.onClick(true)}}>
        <Image
        source={require("../images/edit.png")}
        style={{ width: 75, height: 75 }}
        />
        </TouchableOpacity>        
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    screen: {
      marginTop:30,
      flex: 1,
    },
    
    title: {
      marginTop: 10,
      marginLeft: 10,
      flexDirection: "row",
     alignItems:"center"
    },
    tasteContainer: {
      display: "flex",
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 25,
      borderColor: "#C3C3C3",
      borderWidth: 1,
      borderRadius: 10,
      flexDirection: "column",
      width: "95%",
      height: Dimensions.get("window").height / 6,
      //backgroundColor:'yellow',
    },
    textsContainer: {
      marginLeft: 70,
      width: (Dimensions.get("window").width * 2) / 3,
    },
    //   buttonContainer: {
    //     zIndex: 1,
    //     elevation: 1,
    //   },
    //연필모양 편집버튼 layout container
    //   roundButtonsContainer: {
    //     backgroundColor: "yellow",
    //     //flex: 4,
    //     alignItems: "flex-end",
    //     justifyContent: "flex-end",
    //   },
    roundButton: {
      //연필 버튼 고정시키기
      position: "absolute",
      bottom: Dimensions.get("window").width / 50,
      right: Dimensions.get("window").width / 50,
      //default가 배경이 투명하므로, 백그라운드 주면 안됨
      //backgroundColor: "white",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      //width: Dimensions.get("window").width / 4,
      //height: Dimensions.get("window").width / 4,
    },
    imageStyle: {
      width: (Dimensions.get("window").width * 1) / 6,
      height: (Dimensions.get("window").width * 1) / 6,
    },
  });
  
  export default HistoryScreen;


