import * as React from 'react';
import{View,Text, TextInput, TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config'
import firebase from 'firebase'

import AppTabNagivator from '../components/AppTabNagivator'

export default class SignUpLoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailId:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false'

        }
    }

    showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }
    userlogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
        return Alert.alert("Sucessfully Login")
        })
        .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
        })
    }
    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }
    render(){
        return(
     <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>

</View>
  {
    this.showModal()
  }
    <Text style={styles.title}>
     Batter System
     </Text>
     <View>
         <TextInput style={styles.LoginBox}
          placeholder="abc@example.com"
          keyboardType="email-address"
          onChangeText={(text)=>{
              this.setState({
                  emailId:text
              })
          }}
             />
                      <TextInput style={styles.LoginBox}
          placeholder="enter Password"
          secureTextEntry={true}
          onChangeText={(text)=>{
              this.setState({
                  password:text
              })
          }}
             />
             <TouchableOpacity style={styles.button}
             onPress={()=>{
                 this.userlogin(this.state.emailId, this.state.password)
             }}>
            <Text style={styles.buttonText}>Login</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button}
             onPress={()=>{
                 this.userSignUp(this.state.emailId,this.state.password)
             }}>
            <Text style={styles.buttonText}>SignUp</Text>
             </TouchableOpacity>
     </View>
     </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
    flex:1,
    background:'peach',
    },
    button:{
width:300,
height:50,
justifyContent:'center',
alignItems:'center',
borderRadius:25,
background:'#ff9800',
shadowColor:'#000',
shadowOffset:{
    width:0,
    height:8,
},
shadowOpacity:0.30,
shadowRadius:10.32,
elevation:16,
    },
    buttonText:{
color:'#ffff',
fontWeight:'bold',
fontSize:20
    },
    LoginBox:{
 width:300,
 height:40,
 borderBottomWitdth:1.5,
 borderColor:'#ff8a65',
 fontSize:20,
 margin:10,
 paddingLeft:10
    },
    imageIcon: {
        width: 200,
        height: 200,
        marginLeft: 60,
      },
    title:{
fontSize:70,
fontWeight:'bold',
paddingBottom:30,
color:'#ff3d00'
    }
})