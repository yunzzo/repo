import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Touchable,
} from "react-native";

//상세페이지에서 취향 버튼 눌렀을 때 나오는 페이지

/*
이미지 렌더링, props로 받아온 호칭 배열에 image key와 주소를 추가해서(for문과 if문을 이용) 배열을 새롭게 재구성,
게별적으로 이미지 렌더링이 가능하게 했다. (props.tastes도 하나의 새로운 지역변수이므로!)
*/
const SmallTasteScreen = (props) => {
  //호칭 정보를 받아와서, 새로운 배열에 저장
  //호칭별로 다른 이미지 구현하는 로직
  const imageSources = [
    require("../images/food.png"),
    require("../images/hobby.png"),
    require("../images/music.png"),
    require("../images/culture.png"),
    require("../images/place.png"),
    require("../images/present.png"),
    require("../images/custom.png"),
  ];
  //받아온 호칭 배열에 이미지 주소 넣기
  for (i = 0; i < props.tastes.length; i++) {
    //6번쨰까지는 각자 이미지
    if (i < 6) {
      props.tastes[i].image = imageSources[i];
    }
    //기존에 image 키 없어도 자동으로 추가되기 때문에 문제없다.
    else {
      props.tastes[i].image = imageSources[6];
    }
  }

  /*
        이미지 변수에 담아서 넣어야함. 0,1,2,3,4,5까지는 custom 이미지 쓰고,
        그 이후부터는 그 통일된 이미지 넣는 로직 만들어야함ㅋㅋ
  */
  //const [resource, setResource]=useState('');

  const renderItem = ({ item }) => {
    //console.log("잘 나오는데..",item.image, typeof(item.image));
    return (
      <View style={styles.tasteContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.imageStyle} />
        </View>

        <View style={styles.textsContainer}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ color: "grey" }}>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <FlatList data={props.tastes} renderItem={renderItem} />

      <View style={styles.roundButton}>
        <TouchableOpacity onPress={() => props.onClick(true)}>
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
    flex: 1,
  },
  tasteContainer: {
    flexDirection: "row",
    width: "100%",
    height: Dimensions.get("window").height / 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    //backgroundColor:'yellow',
  },
  imageContainer: {
    width: (Dimensions.get("window").width * 1) / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  textsContainer: {
    width: (Dimensions.get("window").width * 2) / 3,
    justifyContent: "center",
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

export default SmallTasteScreen;
