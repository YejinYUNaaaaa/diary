import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import MainScreen from './screen/MainScreen';
import DetailScreen from './screen/DetailScreen';
import WriteScreen from './screen/WriteScreen';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

const BaseNavi = createBottomTabNavigator({
  MainScreen : {
    screen : MainScreen,
  },
  DetailScreen : {
    screen : DetailScreen
  },
  WriteScreen : {
    screen : WriteScreen,
    //key : value 형식 (앞의 screen은 정해진 형식이다.)

    // navigationOptions : {
    //   tabBarIcon : ({tintColor}) => (
    //     <MaterialCommunityIcons name="calendar-multiselect" size={25} style={{color :tintColor}}/>
    //   )
    // }
  },
},
//두번 째 인자로 라벨을 안보이게 하는 속성을 지정할 수 있다!
{
  tabBarOptions : {
    showLabel : false,
  }
}
)

const BaseNavi2 = createStackNavigator(
  {
    Write : WriteScreen,
    Tab : BaseNavi,
    Detail : DetailScreen,
  },
  {
    initialRouteName : 'Tab',
    // mode : 'modal'
    headerMode : 'none' //
  }
  
)

const MyNavi = createAppContainer(BaseNavi2)

export default function App() {
  return (
    <View style={styles.container}>
      <MyNavi/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
