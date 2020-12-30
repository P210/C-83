import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BuyScreen extends React.Component{
    constructor(){
        super();
            this.state={
         userId:firebase.auth().currentUser.email,
         bookName:"",
         reasonToRequest:""
            }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    addRequest=(bookName,reasonToRequest)=>{
        var userId= this.state.userId
        var ramdomRequestId= this.createUniqueId()
        db.collection('requested_books').add({
            "user_id": userId,
            "book_name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id"  : randomRequestId,
        })
        this.setState({
            bookName :'',
            reasonToRequest : ''
        })
        return Alert.alert("Buy Request Successfull")
    }
    keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        leftElement={
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: item.image_link,
            }}
          />
        }
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("RecieverDetails", {
                details: item,
              });
            }}
          >
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };
    render(){
        return(
      <View style={{flex:1}}>
     <MyHeader title="Buy Books"/>
     <KeyboardAvoidingView style={styles.keybordStyle}>
    <TextInput
 style ={[styles.formTextInput,{height:300}]}
 multiline
 numberOfLines ={8}
 placeholder={"Why do you need the book"}
 onChangeText ={(text)=>{
     this.setState({
         reasonToRequest:text
     })
 }}
 value ={this.state.reasonToRequest}
    />
    <TouchableOpacity
     style={styles.button}
     onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}>
        <Text>Request</Text>
    </TouchableOpacity>
     </KeyboardAvoidingView>
      </View>
        )
    }
}
const styles = StyleSheet.create({
    keybordStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )