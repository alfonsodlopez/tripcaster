/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TextInput,
} from 'react-native';

export default class App extends Component<{}> {

    state = {
        currentLocation: "",
        destination: "",
        searchQuery: ""
    }

    _onPressButton() {
        Alert.alert('You tapped the button!')
    }

    enterText(value) {
    /*    console.log(value);*/  
        this.setState(this.state)
    };



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.label}>
                Current Location:
            </Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={this.enterText.bind(this)}
            >
            </TextInput>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>
                Destination:
            </Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={this.enterText.bind(this)}
            >
            </TextInput>
        </View>
        <Button
            className = "submit_button"
            onPress={this._onPressButton}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    submit_button: {
        borderColor: '#60b7e2',
        borderWidth: 1,  
    },
    textInput: {
        textAlign: 'left',
        color: '#333333',
        margin: 5,
        marginBottom: 30,
        height: 50,
        borderColor: '#60b7e2',
        borderWidth: 1,
        flex: 2
    },
    row: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        height: 50
    },
    label: {
        textAlign: 'right',
        margin: 10,
        flex: 1,
        color: '#60b7e2',
  },
});
