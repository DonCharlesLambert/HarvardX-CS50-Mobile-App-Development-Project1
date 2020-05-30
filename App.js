import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { vibrate } from './utils';

export default function App() {
  return (
    <ImageBackground source={{uri: "https://i.pinimg.com/474x/93/90/7c/93907c034fd00259d6afac112e9ddda6.jpg"}} style={styles.container}>
      <Timer workTime={1500} breakTime={300} />
    </ImageBackground>
  );
}

class Timer extends React.Component {
  state = {
    time: 0,
    button: 'Pause',
    activity: 'Work',
    workTime: 0,
    breakTime: 0,
    workText: '',
    breakText: '',
  };

  styles = StyleSheet.create({
    pomodoroTimer: {
      alignItems: 'center',
      width: '70%',
    },

    clock: {
      fontSize: 72,
      color: '#E2E2E4',
    },

    title: {
      color: '#091428',
      fontWeight: 'bold',
      fontSize: 32,
    },

    buttonContainer: {
      paddingTop: '5%',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    btn: {
      backgroundColor: 'rgba(197, 175, 162, 0.3)',
      marginLeft: '5%',
      marginRight: '5%',
      padding: '2%',
      width: '35%',
      textAlign: 'center',
      borderRadius: '15%',
    },

    btnText: {
      textAlign: 'center',
      color: '#4c704c',
      fontWeight: 'bold',
    },

    textbox: {
      height: 25,
      textAlign: 'center',
      margin: '2%',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

    clockBox: {
      width: '100%',
      padding: '5%',
      backgroundColor: 'rgba(197, 175, 162, 0.6)',
      borderRadius: '15%',
      alignItems: 'center',
    },
  });

  constructor() {
    super();
  }

  startTimer() {
    this.setState({ button: 'Pause' });
    this.timeFunction = setInterval(() => {
      this.setState({ time: this.state.time - 1 });
    }, 1000);
  }

  pauseTimer() {
    this.setState({ button: 'Go' });
    clearInterval(this.timeFunction);
  }

  stopTimer() {
    this.pauseTimer();
    this.setState({ time: 0 });
  }

  toggleBtnPress() {
    if (this.state.button === 'Pause') {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  resetBtnPress() {
    if (this.state.activity == 'Work') {
      this.setState({ time: this.state.workTime });
    } else {
      this.setState({ time: this.state.breakTime });
    }
    this.pauseTimer();
  }

  setWorkTime() {
    if (!isNaN(this.state.workText) && this.state.workText != 0) {
      console.log('yes');
      if (this.state.activity == 'Work') {
        this.pauseTimer();
      }
      this.setState({ workTime: this.state.workText }, () =>
        this.resetBtnPress()
      );
    }
  }

  setBreakTime() {
    if (!isNaN(this.state.breakText) && !this.state.breakText != '') {
      if (this.state.activity == 'Break') {
        this.pauseTimer();
      }
      this.setState({ breakTime: this.state.breakText }, () =>
        this.setBreakTime()
      );
      this.resetBtnPress();
    }
  }

  componentDidMount() {
    this.setState({
      time: this.props.workTime,
      workTime: this.props.workTime,
      breakTime: this.props.breakTime,
    });
    this.startTimer();
  }

  componentWillUnmount() {
    this.pauseTimer();
  }

  toTwoDigits(num) {
    return ('0' + num).slice(-2);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextState.time == 0) {
      vibrate();
      if (this.state.activity == 'Work') {
        this.setState({ time: this.state.breakTime, activity: 'Break' });
      } else {
        this.setState({ time: this.state.workTime, activity: 'Work' });
      }
    }
    return true;
  }

  getTime() {
    let time = this.state.time;
    const minutes = this.toTwoDigits(Math.floor(this.state.time / 60));
    const seconds = this.toTwoDigits(this.state.time % 60);
    time = `${minutes}:${seconds}`;
    return time;
  }

  render() {
    return (
      <View style={this.styles.pomodoroTimer}>
        <View style={this.styles.clockBox}>
          <Text style={this.styles.title}>{this.state.activity + ' Time!'}</Text>
          <Text style={this.styles.clock}>{this.getTime()}</Text>
        </View>

        <View style={this.styles.buttonContainer}>
          <TouchableOpacity
            style={this.styles.btn}
            onPress={() => this.toggleBtnPress()}>
            <Text style={this.styles.btnText}>{this.state.button}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={this.styles.btn}
            onPress={() => this.resetBtnPress()}
            title="Reset">
            <Text style={this.styles.btnText}>Reset</Text>
          </TouchableOpacity>
        </View>
        {/* 
        <TextInput
          style={this.styles.textbox}
          placeholder="Enter Work Time (s)"
          text={this.state.workText}
          onChangeText={(text) => this.setState({ workText: text })}
          onEndEditing={(e) => this.setWorkTime()}
        />
        <TextInput
          style={this.styles.textbox}
          placeholder="Enter Break Time (s)"
          text={this.state.breakText}
          onChangeText={(text) => this.setState({ breakText: text })}
          onEndEditing={(e) => this.setBreakTime()}
        />*/}
      </View>
    );
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
