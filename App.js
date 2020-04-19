import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Timer/>
    </View>
  );
}

class Timer extends React.Component{
  state = {
    time: 0,
  }

  constructor(){
    super()
  }

  componentDidMount() {
    this.timeFunction = setInterval(() => {console.log(this.state.time); this.setState({time: this.state.time + 1})}, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timeFunction)
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
    return (<Text>{this.getTime()}</Text>)
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
