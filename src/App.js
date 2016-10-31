import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
} from 'react-native';

var myLen=10 //棋盘长宽
var typeLen=5 //5子棋

import Board from './Board'
import calculateWinner from './calculateWinner'

class Game extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      history:[
        {
          squares: Array(myLen*myLen).fill(null)
        },
      ],
      xIsNext:true,
      stepNumber:0
    };
  }

  handleClick(i){
    var history=this.state.history
    var current=history[history.length - 1]
    var squares=current.squares.slice()
    var stepNumber=this.state.stepNumber

    if(calculateWinner(squares,myLen,typeLen)||squares[i]) return console.log('不能走了');
    if(stepNumber<(history.length - 1)) return console.log('不能走了 还在步骤里');

    squares[i]=this.state.xIsNext?"X":"O"
    console.log(history.concat([{
        squares:squares
      }]));
    this.setState((prevState) => ({
      history:history.concat([{
        squares:squares
      }]),
      xIsNext:!this.state.xIsNext,
      stepNumber:prevState.stepNumber+1
    }))
    
  }

  jumpTo(step){
     if(step==0){
        this.setState({
           history:[
              {
                squares: Array(myLen*myLen).fill(null)
              },
            ],
            xIsNext:true,
            stepNumber:0
        })
     }else{
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) ? false : true,
        });
     } 
     
  }

  render() {
    var history=this.state.history
    var current=history[this.state.stepNumber]
    var winner=calculateWinner(current.squares,myLen,typeLen);



    let status;
    if (winner) {
        status = '赢家: ' + winner;
      } else {
        status = '下一步: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    var moves=history.map((step,move)=>{
       var desc=move?"步骤 #" + move+ "-" + ((move % 2) ? "X" : "O") :"重新开始"
       return (
          <View style={styles.list} key={move}>
             <TouchableOpacity style={styles.btn}   onPress={() => this.jumpTo(move)}>
             <Text>{desc}</Text></TouchableOpacity>
          </View>   
          
        )
    })


    return (
      
            <View style={styles.container} >
              <View style={styles.header}>
                  <Text style={styles.text1}>
                      React (ios与android) 五子棋
                  </Text>
              </View>
              <View  style={styles.board}>
                <Board myLen={myLen} 
                squares={current.squares}
                onClick={(i)=>this.handleClick(i)}  />
              </View>

              <View style={styles.viewb} >
                <View style={styles.viewb1}><Text style={styles.text1}>{status}</Text></View>
                <ScrollView style={styles.flex}>
                    {moves}
                </ScrollView>
              </View>
            </View>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    flex:{
      flex:1
    },
    header:{
      marginTop:20,
      marginBottom:20,
       justifyContent: 'center',
       alignItems:"center",
    },
    text1:{
      fontSize:20
    },
    board:{
      paddingLeft:10,
    },
    viewb:{
      flex:1,
      marginTop:20,
    },
    viewb1:{
      marginBottom:20,
    },
    list:{
      padding:8,
      borderBottomWidth:1,
    },
    btn:{
      width:200,
    }
 }) 

export default Game

// ========================================







