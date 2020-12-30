import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert, TouchableOpacity} from 'react-native';

import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
render(){
    return(
        <View style={{flex:1}}>
         <View style={{flex:0.8}}> 
        <DrawerItems
            {...this.props}
         />
          </View>
          <View style={{flex:0.2,justifyContent:'flex-end',paddingBottom:30}}>
           <TouchableOpacity style={{height:30,width='100%',justifyContent:'center',padding:10}}>
               onPress={()=>{
                   this.props.navigation.navigate('SignupLoginScreen')
                   firebase.auth().signOut()
               }}
               <Text>LogOut</Text>
           </TouchableOpacity>
          </View>
        </View>
    )
}
}