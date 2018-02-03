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
import secrets from './secrets'

export default class App extends Component<{}> {

    state = {
        currentLocation: '',
        destination: '',
        searchQuery: '',
        listenNotesURL: 'https://listennotes.p.mashape.com/api/v1/search?offset=&',
        len_min: 40,
        len_max: 50,
        offset: 0,
        text: '',
        travelMode: 'DRIVING'
    }

    podcastSearchURL = `${this.state.listenNotesURL}`

    _onPressButton() {
        const params = {
            offset: this.state.offset,
            len_min: this.state.len_min,
            len_max: this.state.len_max,
            q: this.state.searchQuery 
        };
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        console.log(this.podcastSearchURL+query)
        fetch(this.podcastSearchURL+query, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Mashape-Key': secrets.podcasts
            }
        })
        .then(res => {
            console.log(res)
            return res.json()
        })
        .catch((error) => {
            console.log('Error', error); // no error is returned
            throw error;
      })

    };

    otherPressButton() {
        var origin1 = new google.maps.LatLng(55.930385, -3.118425);
        var origin2 = 'Greenwich, England';
        var destinationA = 'Stockholm, Sweden';
        var destinationB = new google.maps.LatLng(50.087692, 14.421150);

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [this.state.currentLocation],
                destinations: [this.state.destination],
                travelMode: this.state.travelMode,
            }, callback);

        function callback(response, status) {
        //The DistanceMatrixResponse object contains one row for each origin 
        //that was passed in the request. Each row contains an element field 
        //for each pairing of that origin with the provided destination(s).
            if (status == 'OK') {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.text;
                    var duration = element.duration.text;
                    var from = origins[i];
                    var to = destinations[j];
                    }
                }
                console.log(results)
            }

        }
    };

    enterText(value) {
        console.log(value) 
        this.state.text = value 
        this.setState(this.state)
    };

    enterSearch(value) {
        console.log('Search: ' + value)
        this.state.searchQuery = value
        this.setState(this.state)
    };

    enterLocation(value) {
        this.state.currentLocation = value
        this.setState(this.state)
    };

    enterDestination(value) {
        this.state.destination = value
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
                onChangeText={this.enterLocation.bind(this)}
            >
            </TextInput>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>
                Destination:
            </Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={this.enterDestination.bind(this)}
            >
            </TextInput>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>
                What topic are you interested in?
            </Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={this.enterSearch.bind(this)}
            >
            </TextInput>
        </View>
        <Button
            className = "submit_button"
            onPress={this._onPressButton.bind(this)}
            title="Submit for ListenNotes Response"
            color="#841584"
            accessibilityLabel="Press this button to get episodes for your commute"
        />
        <Button
            className = "submit_button"
            onPress={this.otherPressButton.bind(this)}
            title="Submit for Maps Response"
            color="#841584"
            accessibilityLabel="Press this button to get episodes for your commute"
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
