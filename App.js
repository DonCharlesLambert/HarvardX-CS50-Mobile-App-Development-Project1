import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Timer time={1500} />
    </View>
  );
}

class Timer extends React.Component{
  state = {
    time: 0,
    button: "Pause",
  }

  styles = StyleSheet.create({
    clock: {
      fontSize: 48
    },

    row: {
      flexDirection: "row"
    }
  })

  constructor(){
    super()
  }

  startTimer(){
    this.setState({button: "Pause"})
    this.timeFunction = setInterval(() => {this.setState({time: this.state.time - 1})}, 1000)
  }

  pauseTimer(){
    this.setState({button: "Go"})
    clearInterval(this.timeFunction)
  }

  stopTimer(){
    this.pauseTimer()
    this.setState({time: 0})
  }

  toggleBtnPress(){
    if(this.state.button === "Pause"){
      this.pauseTimer()
    }else{
      this.startTimer()
    }
  }

  componentDidMount() {
    this.setState({time: this.props.time})
    this.startTimer()
  }

  componentWillUnmount() {
    this.pauseTimer()
  }

  toTwoDigits(num){
    return ("0" + num).slice(-2);
  }

  getTime(){
    let time = this.state.time
    const minutes = this.toTwoDigits(Math.floor(this.state.time/60))
    const seconds = this.toTwoDigits(this.state.time  % 60)
    time = `${minutes}:${seconds}`
    return time
  }

  render(){
    return (
      <View>
        <Text style={this.styles.clock}>
          {this.getTime()}
        </Text>
        <View style={this.styles.row}>
          <Button onPress={() => this.toggleBtnPress()} title={this.state.button}/>
          <Button title="Reset"/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
