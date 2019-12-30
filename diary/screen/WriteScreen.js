import React from 'react';
import { StyleSheet, TextInput, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import WriteHeader from '../components/WriteHeader'
import uuid from 'uuid/v1'
import * as ImagePicker from 'expo-image-picker'



const { width, height } = Dimensions.get('window');

export default class WriteScreen extends React.Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons name="lead-pencil" size={30} style={{color:tintColor}}/>
    ),
    tabBarOnPress: ({navigation}) => {
      navigation.navigate('Write')
    }
  }

  state = {
    inputTitle :'',
    inputContent : '',
    imageUri : '',
  }

  _changeTitle = (value) => {
    this.setState({inputTitle : value}) //e.target.value필요없음 value는 약속으로 먼저 만들어져있음
  }
  
  _changeContent = (value) => {
    this.setState({inputContent : value})
  }

  _saveText = () => {
    if(this.state.inputTitle !== '') {
      const id = uuid()
      const date = this._getToday()
      const newPost = {
        id : id,
        title : this.state.inputTitle,
        content : this.state.inputContent,
        date : date,
        imageUri : this.state.imageUri,
      }
      this.setState({
        inputTitle : '',
        inputContent : '',
        imageUri : '',
      })
      this.props.navigation.navigate('MainScreen', {myparam : newPost})
    } 
    else {this.props.navigation.navigate('MainScreen')} //그냥 공란으로 저장시 아무것도 저장하지말고 mainscreen으로 redirect
  }

  _getToday = () => {
    year = (new Date().getFullYear()).toString()
    month = (new Date().getMonth()+1).toString()
    day = (new Date().getDate()).toString()
    if(parseInt(month)<10){
      month = '0' + month // 8월을 08로 표시하기 위해서!
    }
    if(parseInt(day)<10){
      day = '0' + day
    }

    return (year + '-' + month + '-' + day)
  }

  _selectImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing : true, //편집기능
    });
  

  console.log(result);

  if (!result.cancelled){
    this.setState({imageUri : result.uri});
  }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <WriteHeader saveprops={this._saveText} selectImage={this._selectImage} />
          <TextInput
            value = {this.state.inputTitle}
            onChangeText = {this._changeTitle}
            placeholder="제목을 입력하세요"
            style={styles.title}
            returnKeyType="done" />
          {this.state.imageUri ? 
          <Image source = {{uri : this.state.imageUri}} style={{width :200 , height : 200}} /> : null
          }

          <TextInput
            value = {this.state.inputContent}
            onChangeText = {this._changeContent}         
            placeholder="내용을 입력하세요"
            multiline={true} //여러줄에 걸친 입력이 가능합니다
            style={styles.content}
            returnKeyType="done" />
        </View>
      </SafeAreaView>
)}}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  paddingTop:30,
  },
  contentContainer: {
  width: width - 60,
  },
  title: {
  marginVertical: 30, //margin을 위 아래로 주는 속성입니다
  fontSize: 30,
  paddingBottom: 12,
  borderBottomWidth: 2,
  },
  content: {
  fontSize: 20,
  },
});
            