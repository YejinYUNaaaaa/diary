import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity , AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda} from 'react-native-calendars'
import uuid from 'uuid/v1'



export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{color:tintColor}}/>
    )
  }

  _storeData = async() => {
    await AsyncStorage.setItem('@diary:state', JSON.stringify(this.state))
  }

  _getData = async() => {
    const mystate = await AsyncStorage.getItem('@diary:state')
    if(mystate !== null){
      this.setState(JSON.parse(mystate))
    }
  }
  state={
    selectedDate: '',
    Posts: [{
      title: '11월 18일',
      content: '본문',
      date: '2019-11-18'
    },
    {
      title: '11월 18일',
      content: '본문',
      date: '2019-11-18'
    },
  ]
  }
  
  // newPost는 didmount를 통해서 재 렌더링 후에 가져올 수 있다
  // newPost는 WriteScreen에서 저장버튼을 누르는 순간 할당이 되는데 처음에 MainScreen에서는 당연히 가져올 수 없음 => 렌더링 후에 가져오면 된다!
  // 그럼 detailscreen으로 갈때는 왜 그냥 됨?? => Flatlist안의 renderItem이 이문제를 해결해줬기 때문에!(renderItem으로 여기서 렌더할거라고 확정을 지어줘서!) 
  // 따 라 서 데이터가 렌더링 되는 시점을 항상 생각해라!
  componentDidMount(){
    this._getData()
    this.props.navigation.addListener(
      'didFocus',
      () => {
        newPost =this.props.navigation.getParam('myparam')
        signal = this.props.navigation.getParam('signal')
        if (newPost){
          const prevPost = [...this.state.Posts]
          this.setState({Posts : prevPost.concat(newPost)}, this._storeData)
          this.props.navigation.navigate('MainScreen' , {myparam : false}) //myparam을 false로 바꿔줘야 다른 로직에서의 실행이 안됨 (메인페이지가 didFocus가 될때마다 실행되는 걸 막아줌)
        }
        else if (signal){
          const prevPost2 =[...this.state.Posts]
          deleteIndex = prevPost2.findIndex((item)=>{item.id === signal})
          prevPost2.splice(deleteIndex,1)

          this.setState({Posts:prevPost2}, this._storeData)
          this.props.navigation.navigate('MainScreen' , {signal : false})
        }
      }
    )
  }


  render() {
    console.log(uuid())
    console.log(this.state.selectedDate)
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          onDayPress={(day) => {this.setState(this.state.selectedDate = day)}}
          current={new Date()}
        />
        <ScrollView>
          <FlatList
            data={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString})}
            renderItem={({item, index})=>{
              return (
                <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate('Detail', {post:item})}}>
                  <View>
                    <Text>
                      {item.title}
                    </Text>
                    {/* <Text>
                      {item.content}
                    </Text> */}
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => {return `${index}`}}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  textstyle: {
    fontSize: 40,
  }
});