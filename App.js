import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Timer workTime={10} breakTime={10}/>
    </View>
  );
}

class Timer extends React.Component{
  state = {
    time: 0,
    button: "Pause",
    activity: "Work",
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

  resetBtnPress() {
    if (this.state.activity == "Work"){
      this.setState({time: this.props.workTime})
    }else {
      this.setState({time: this.props.breakTime})
    }
  }

  componentDidMount() {
    this.setState({time: this.props.workTime})
    this.startTimer()
  }

  componentWillUnmount() {
    this.pauseTimer()
  }

  toTwoDigits(num){
    return ("0" + num).slice(-2);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextState.time == 0) {
      if (this.state.activity == "Work") {
        this.setState({time: this.props.breakTime, activity: "Break"})
      } else {
        this.setState({time: this.props.workTime, activity: "Work"})
      }
    }
    return true
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
        <Text>
          {this.state.activity + " Time!"}
        </Text>
        <Text style={this.styles.clock}>
          {this.getTime()}
        </Text>
        <View style={this.styles.row}>
          <Button onPress={() => this.toggleBtnPress()} title={this.state.button}/>
          <Button onPress={() => this.resetBtnPress() } title="Reset"/>
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
