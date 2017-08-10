import React from "react";
import MapView from 'react-native-maps';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import { connect } from "react-redux"
import { NavigationActions } from 'react-navigation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import axios from 'axios';

import Pin from '../components/Pin'
import {authActions} from '../store/actions/authActions'

class App extends React.Component{
    constructor(props) { 
        super(props);
        console.log(props)
        this.state = {
            loading: false,
            error: null,
            earth: false,
            position: 
            {
                latitude: 24.8584049,
                latitudeDelta: 0.006607147806899755,
                longitude: 67.007501,
                longitudeDelta: 0.0063600431189364
            },
            search: '',
            pins: []
        }
    }
    static navigationOptions = {
        title: 'Map',
    };
    
    regionFrom = (lat, lon, accuracy) => {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;

        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta: Math.max(0, latDelta),
            longitudeDelta: Math.max(0, lonDelta)
        };
    }

    componentDidMount() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "YES",
            cancel: "NO"
        }).then(function(success) {
            // success => {alreadyEnabled: true, enabled: true, status: "enabled"} 
                this.setState({loading: true})
                navigator.geolocation.getCurrentPosition((position) => {
                    this.setState({loading: false})                    
                    var position = this.regionFrom(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
                    this.setState({position});
                }, error => {
                    console.log(error); 
                    this.setState({loading: false, error})
                }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
        });
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var position = this.regionFrom(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
            this.setState({position});
        });
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    fetchRecomend = () => {
        let key = 'AIzaSyDD9VHVK_eVmAK8nwHWBCVVB-gbxA6RTdI'
        let query = this.state.search
        console.log(query)
        let location = `${this.state.position.latitude},${this.state.position.longitude}`
        console.log(location)
        let uri = `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=100&key=${key}&query=${query}&location=${location}`
        if(query){
            if(query.length > 0){
            axios.get(uri).then(({data}) => {
                console.log(data.results)
                this.setState({pins: data.results})
            })}
        }
    }
    onRegionChange = (position) => {
        this.setState({position})
        // this.fetchRecomend()
        // console.log('arggggggggggggggggggggg', position)
    }
    render() {
                    {/* style={styles.container} */}
        return(
            <View style={styles.container}>
                {/* {this.state.earth? 
                    <MapView
                        mapType={'satellite'}
                        style={styles.container}
                        region={this.state.position}
                        initialRegion={{
                            latitude: 24.8584049,
                            latitudeDelta: 0.006607147806899755,
                            longitude: 67.007501,
                            longitudeDelta: 0.0063600431189364
                        }}
                        onRegionChange={this.onRegionChange}
                    >
                        <MapView.Marker
                            coordinate={this.state.position}
                            title="hello"
                            description= "world"
                        >
                            <View style={styles.radius}>
                                <View style={styles.marker}></View>
                            </View>
                        </MapView.Marker>
                    </MapView>
                : */}
                    <MapView
                        style={styles.container}
                        region={this.state.position}
                        followsUserLocation={true}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: 24.8584049,
                            latitudeDelta: 0.006607147806899755,
                            longitude: 67.007501,
                            longitudeDelta: 0.0063600431189364
                        }}
                        onRegionChange={this.onRegionChange}
                    >
                    {this.state.pins.map((el, ind) => (
                        <View navigate={this.props.navigation.navigate} key={ind}>
                            <Pin el={el} navigate={this.props.navigation.navigate}/>
                        </View>
                    ))

                    }
                    </MapView>                
                {/* } */}
                <View style={{backgroundColor: "#fff"}}>
                    <TextInput value={this.state.search} onChangeText={(val) => {
                        this.setState({search: val})
                    }} ref='search'/><Button disabled={this.state.search.length < 1} title="search" onPress={this.fetchRecomend}/>
                </View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    // padding: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  marker: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "rgba(0, 122, 255, 0.8)"
  },
  radius: {
      width: 50,
      height: 50,
      borderRadius: 25,
      overflow: "hidden",
      backgroundColor: "rgba(0, 122, 255, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(0, 122, 255, 0.3)",
      alignItems: "center",
      justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

const mapStateToProps = (state) => ({
    user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
    logIn: (payload) => {dispatch(authActions.logIn(payload))},
    logOut: (payload) => {dispatch(authActions.logOut())},
    signUp: (payload) => {
        let gm = authActions.signUp(payload);
        console.log(gm)
        dispatch(gm)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App) 