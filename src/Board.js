import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from 'react-native';

var pixel=1/PixelRatio.get()
var {height, width} = Dimensions.get('window');

class Square extends Component {
  render() {
    var w=(width-20)/this.props.myLen
    return (
      <TouchableOpacity style={[styles.square,{width:w,height:w}]} onPress={this.props.onClick}>
        <Text style={styles.text}>{this.props.value}</Text>
      </TouchableOpacity>
    );
  }
}


class Board extends Component {


  renderSquare(i) {
    return <Square key={i} myLen={this.props.myLen} value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} />;
  }

  render() {

    var myLen1=this.props.myLen
    var squares=this.props.squares
    var square=squares.map((val,index)=>{
       return this.renderSquare(index)
    })
    
    var arr=[]
    
    for(var i=0;i<myLen1;i++){
        var ind=i*myLen1
        var row=<View key={i} style={styles.boardRow}>
                   {square.slice(ind,ind+myLen1)}
                </View>
                //console.log(row);
        arr.push(row)        
    }
    
    return (
      <View>
         {arr}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#F5FCFF',
    
  },
  square:{
    backgroundColor: '#fff',
    borderWidth:pixel,
    borderColor:"#999",
    padding: 0,
    justifyContent: 'center',
    alignItems:"center",
   },

   text:{
    fontSize: 24,
    fontWeight: 'bold',
   },
   boardRow:{
      flexDirection:"row",

   }
  

});

export default Board