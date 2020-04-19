import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Timer></Timer>
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

  render(){
    return (<Text>{this.state.time}</Text>)
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
