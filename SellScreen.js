import * as React from 'react';
import {View,StyleSheet,Text,ListItem, TouchableOpacity, FlatList} from 'react-native'
import MyHeader from '../components/MyHeader';

export default class SellScreen extends React.Component{
    constructor(){
        super()
        this.state={
            sellingBooksList:[],
        }
        this.sellingRef=null
    }

getSellingBooksList=()=>{
    this.sellingRef=db.collection("Selling Books")
    .onSnapshot((snapshot)=>{
        var sellingBooksList=snapshot.docs.map(document=>document.data())
        this.setState({
            sellingBooksList:sellingBooksList
        })
    })
}
componentDidMount(){
    this.getSellingBooksList()
}
componentWillMount(){
    this.sellingRef
}
keyExtracter=()=>{
    return(
        <ListItem key={i}
        title={item.book_name}
        subtitle={item.reason_to_sell}
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity>
                <Text>View</Text>
            </TouchableOpacity>
            
        }
        bottomDivider
         />
    )
}
render(){
    return(
        <View style={{flex:1}}>
        <MyHeader title='Sell Books' 
                />
                <View styles={{flex:1}}>
                {
                    this.state.sellingBooksList.length===0
                    ?(
                        <View>
                            <Text>
                                List Of all Books
                            </Text>
                            </View>
                    )
                    :(
                        <FlatList keyExtractor={this.keyExtracter}
                        data={this.state.sellingBooksList}
                        renderItem={this.renderItem}
                        />
                    )
                    
                }
                </View>
        </View>
    )
}
}